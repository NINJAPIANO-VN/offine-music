# Cloudflare Setup Guide for Offline Music Player

This guide will help you set up your music player to upload and store MP3 files on Cloudflare R2.

## Prerequisites

- Cloudflare account with R2 enabled
- Node.js installed
- Git installed
- Your project on GitHub

## Step 1: Create Cloudflare R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **R2** in the left sidebar
3. Click **Create Bucket**
4. Name: `offine-music`
5. Choose region (default is fine)
6. Click **Create Bucket**
7. Go to **R2 Settings** and note your:
   - **Account ID**
   - **R2 API Token** (Create one under API Tokens)

## Step 2: Create Cloudflare Worker

### 2.1 Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2.2 Authenticate Wrangler
```bash
wrangler login
```

This will open a browser to authenticate. Approve access.

### 2.3 Update wrangler.toml

Edit `wrangler.toml` and update:

```toml
name = "offine-music"
main = "worker.js"
compatibility_date = "2024-01-01"

[[r2_buckets]]
binding = "MUSIC_BUCKET"
bucket_name = "offine-music"

[env.production]
# Optional: Add your custom domain
vars = { R2_PUBLIC_URL = "https://music.yourdomain.com" }

[env.development]
vars = { R2_PUBLIC_URL = "https://offine-music.your-account-id.r2.cloudflarestorage.com" }
```

Replace `your-account-id` with your actual Cloudflare Account ID.

### 2.4 Deploy Worker

```bash
wrangler deploy
```

After deployment, you'll get a URL like:
```
https://offine-music.your-subdomain.workers.dev
```

## Step 3: Set Up R2 Public Access (Optional but Recommended)

1. In Cloudflare Dashboard → R2
2. Click your `offine-music` bucket
3. Go to **Settings** → **Public Access**
4. Click **Allow Access**
5. Copy the **Public R2 API URL** (looks like `https://your-bucket.your-account-id.r2.cloudflarestorage.com`)

## Step 4: Update index.html with Your Worker URL

Edit `index.html` and find this line at the top of the `<script>` section:

```javascript
const WORKER_URL = 'https://your-worker-url.workers.dev';
```

Replace with your actual worker URL from Step 2.4:

```javascript
const WORKER_URL = 'https://offine-music.your-subdomain.workers.dev';
```

## Step 5: Deploy Frontend to Cloudflare Pages

### 5.1 Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **Pages** in the sidebar
3. Click **Connect to Git**
4. Select your GitHub account and authorize
5. Select the `offine-music` repository
6. Click **Begin setup**

### 5.2 Configure Build Settings

- **Framework preset**: None (since it's static HTML)
- **Build command**: Leave empty
- **Build output directory**: Leave empty
- Click **Save and Deploy**

Your site is now live at: `https://offine-music.pages.dev`

### 5.3 (Optional) Add Custom Domain

1. In Pages settings
2. Click **Custom domain**
3. Add your domain (if you have one)

## Step 6: Make Worker Public (CORS)

The worker needs to accept requests from your frontend. The `worker.js` already includes CORS headers, so it should work!

Test it:
```bash
# Test upload endpoint
curl -X POST https://your-worker-url.workers.dev/upload -F "file=@test.mp3"

# Test list endpoint
curl https://your-worker-url.workers.dev/files
```

## Step 7: Verify Everything Works

1. Go to your Cloudflare Pages URL: `https://offine-music.pages.dev`
2. Click "+ Add MP3 Files"
3. Select an MP3 file
4. You should see an upload status message
5. After upload, the file appears in your playlist
6. Click to play!

## Troubleshooting

### Issue: "Upload failed" error

**Solution**: 
- Check that WORKER_URL is correct in index.html
- Make sure R2 bucket exists
- Check Cloudflare Worker logs: `wrangler tail`

### Issue: Files upload but won't play

**Solution**:
- Check that R2 bucket has Public Access enabled
- Verify R2_PUBLIC_URL in worker environment variables

### Issue: CORS errors in browser console

**Solution**:
- The worker already has CORS headers, but if issues persist:
- Check Cloudflare Worker Routes in wrangler.toml
- Make sure worker is deployed

### Issue: Can't delete files

**Solution**:
- Verify worker has R2 write permissions
- Check R2 bucket permissions

## File Structure After Setup

```
offine-music/
├── index.html              # Frontend with upload UI
├── worker.js              # Cloudflare Worker backend
├── wrangler.toml          # Worker configuration
├── README.md              # Main documentation
├── CLOUDFLARE_SETUP.md    # This file
└── package.json           # (Optional) for dependencies
```

## Environment Variables Reference

In `wrangler.toml`:
- `MUSIC_BUCKET` - R2 bucket binding (auto-configured)
- `R2_PUBLIC_URL` - Public URL for accessing files

## Next Steps

1. **Custom Domain** - Add a custom domain in Cloudflare Pages
2. **Analytics** - Enable Cloudflare Analytics for your worker
3. **Limits** - Know Cloudflare's free tier limits:
   - Workers: 100,000 requests/day free
   - R2: 10GB storage free, then $0.015/GB

## Support

For more info:
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

## Git Push to Deploy

After setup, auto-deploy works:

```bash
git add .
git commit -m "Add Cloudflare setup"
git push origin main
```

Cloudflare Pages automatically rebuilds when you push to GitHub!
