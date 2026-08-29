/**
 * Cloudflare Worker for handling MP3 uploads to R2
 * Deploy this to your Cloudflare Workers
 */

export default {
  async fetch(request, env, ctx) {
    // Enable CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // Upload endpoint: POST /upload
    if (url.pathname === '/upload' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
          return new Response(
            JSON.stringify({ error: 'No file provided' }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        // Validate file is MP3
        if (!file.name.endsWith('.mp3') && file.type !== 'audio/mpeg') {
          return new Response(
            JSON.stringify({ error: 'Only MP3 files are allowed' }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const filename = `${timestamp}-${randomStr}-${file.name}`;

        // Upload to R2
        const arrayBuffer = await file.arrayBuffer();
        await env.MUSIC_BUCKET.put(filename, arrayBuffer, {
          httpMetadata: {
            contentType: 'audio/mpeg',
          },
        });

        // Return file URL
        const fileUrl = `${env.R2_PUBLIC_URL}/${filename}`;
        
        return new Response(
          JSON.stringify({ 
            success: true,
            filename: filename,
            url: fileUrl,
            originalName: file.name
          }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.error('Upload error:', error);
        return new Response(
          JSON.stringify({ error: 'Upload failed: ' + error.message }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // List files endpoint: GET /files
    if (url.pathname === '/files' && request.method === 'GET') {
      try {
        const files = await env.MUSIC_BUCKET.list();
        const fileList = files.objects.map(obj => ({
          name: obj.key,
          url: `${env.R2_PUBLIC_URL}/${obj.key}`,
          uploaded: obj.uploaded,
        }));

        return new Response(
          JSON.stringify({ success: true, files: fileList }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.error('List error:', error);
        return new Response(
          JSON.stringify({ error: 'List failed: ' + error.message }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Delete file endpoint: DELETE /delete/:filename
    if (url.pathname.startsWith('/delete/') && request.method === 'DELETE') {
      try {
        const filename = url.pathname.replace('/delete/', '');
        
        if (!filename) {
          return new Response(
            JSON.stringify({ error: 'No filename provided' }),
            { 
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        await env.MUSIC_BUCKET.delete(filename);

        return new Response(
          JSON.stringify({ success: true, message: 'File deleted' }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.error('Delete error:', error);
        return new Response(
          JSON.stringify({ error: 'Delete failed: ' + error.message }),
          { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};
