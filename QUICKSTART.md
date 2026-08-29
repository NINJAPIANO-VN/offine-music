# Quick Start - Cloudflare Deployment

## 5-Minute Setup

### Step 1: Create R2 Bucket
- Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → R2
- Click **Create Bucket** → Name: `offine-music`
- Enable **Public Access** in Settings

### Step 2: Install & Deploy Worker
```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

Copy your worker URL from the output.

### Step 3: Update Configuration
Edit `index.html` line ~326:
```javascript
const WORKER_URL = 'https://YOUR-WORKER-URL.workers.dev';
```

### Step 4: Deploy Frontend
- Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
- Click **Connect to Git**
- Select your `offine-music` repository
- Click **Save and Deploy**

### Step 5: Test It!
- Open your Pages URL (e.g., `https://offine-music.pages.dev`)
- Click "+ Add MP3 Files"
- Upload an MP3
- Play it!

## Features Now Enabled ✅

✅ Upload MP3s to Cloudflare R2  
✅ Files stored in the cloud  
✅ Access from anywhere  
✅ Delete files from cloud  
✅ Auto-load files on refresh  

## What's New

- **CloudflareWorker** (`worker.js`) - Handles uploads/downloads
- **Updated HTML** - Upload button now syncs with Cloudflare
- **Persistent Storage** - Files saved to R2
- **Auto-deployment** - GitHub → Cloudflare Pages auto-deploys

## Files Structure

```
offine-music/
├── index.html              ← Music player UI (updated for cloud)
├── worker.js              ← Cloudflare Worker backend (NEW)
├── wrangler.toml          ← Worker config (NEW)
├── package.json           ← npm dependencies (NEW)
├── README.md              ← Main docs
├── CLOUDFLARE_SETUP.md    ← Full setup guide
└── QUICKSTART.md          ← This file
```

## Environment Setup (if needed)

Create `.env` file:
```
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Upload fails | Check WORKER_URL in index.html is correct |
| Files won't play | Enable R2 Public Access |
| CORS errors | Worker already has CORS headers, check logs with `wrangler tail` |
| Can't delete files | Verify R2 bucket permissions |

## Limits (Free Tier)

- **Workers**: 100,000 requests/day
- **R2**: 10GB storage + $0.015/GB after
- **Pages**: Unlimited deployments

## Next Steps

1. Add custom domain (optional)
2. Monitor usage in Cloudflare Dashboard
3. Scale up if needed

## Support Links

- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Worker Troubleshooting](https://developers.cloudflare.com/workers/platform/limits/)
- [R2 Docs](https://developers.cloudflare.com/r2/)

---

**That's it! Your music player is now cloud-powered! 🎵☁️**
