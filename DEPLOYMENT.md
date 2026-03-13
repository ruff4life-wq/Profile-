# Vercel Deployment Instructions

1. Ensure your `.env.local` file is present with all required environment variables (e.g., `VITE_GNEWS_API_KEY`).
2. Commit all changes to your repository.
3. Push your code to GitHub, GitLab, or Bitbucket.
4. Go to https://vercel.com/import and import your repository.
5. Set the following in Vercel project settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
   - **Environment Variables:** Add `VITE_GNEWS_API_KEY` and any others needed.
6. For custom server (Express), set the entry point to `server.ts` in Vercel settings or use an API route.
7. Deploy!

See `vercel.json` for custom rewrites if needed.
