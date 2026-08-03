# Meridian AI — Website

A static, dependency-free website (plain HTML/CSS/JS — no build step required).

## File structure

```
index.html          → the entire page markup
css/style.css        → all styling (navy + gold design system)
js/script.js          → nav, mobile menu, scroll reveals, timeline, AI demo simulation, Tally CTAs
images/founder.jpg    → founder portrait
images/favicon.svg    → site icon
_headers              → Cloudflare Pages security/caching headers (optional)
```

Everything is self-contained. Open `index.html` directly in a browser to preview locally, or run a simple local server:

```bash
cd ai-automation-site
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy: GitHub → Cloudflare Pages

### 1. Push to GitHub

```bash
cd ai-automation-site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Connect Cloudflare Pages

1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select your GitHub repository.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (project root)
4. Click **Save and Deploy**.

Cloudflare will build and deploy automatically on every push to `main`. No environment variables or backend are required for the current version of the site.

## Notes

- The **BOOK A FREE AI AUDIT** buttons (and all other conversion buttons) open the Tally form (`https://tally.so/r/jaX7Za`) in a new tab. There is no custom contact form on the site.
- The AI Automation demo in the "Demo" section is clearly labeled **SIMULATED DEMO** — it is a scripted front-end animation, not a live AI integration or a real booking system.
- No fake clients, testimonials, statistics, or case studies are included anywhere on the site.
- To connect a real backend later (e.g. Supabase, a live AI agent, or a real booking system), that logic should be added as new, clearly separated modules — it is intentionally not wired into the current static files.
