**Aayush Kushwaha - Personal Portfolio**

- Stack: React (Vite) + TypeScript + TailwindCSS
- Live domain target: `aayushkushwaha.com`
- Sections: Home, About, Projects, Experience, Skills, Resume, Contact
- Features: Dark/light theme, responsive, SEO meta, minimalist UI

---

**Getting Started**

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` (outputs to `dist/`)
- Preview: `npm run preview`

Place your resume at `public/resume.pdf` (the Resume page links to it).

Project images use in-card placeholders; replace later with real assets.

---
    
**Project Structure**

- `index.html` - SEO metas, favicon, theme bootstrap
- `src/` - React app, pages and components
- `public/` - static assets (`favicon.svg`, `robots.txt`, `resume.pdf` placeholder path)

---

**Deployment (GitHub Pages)**

- Push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`).
- First run: open Settings -> Pages, choose "GitHub Actions" to activate Pages.
- After the workflow finishes, the site is served at `https://aayush-kushwaha.github.io/aayush_website_updated/`.
- When you switch to a custom domain, add the CNAME in Pages settings and update DNS.

**Deployment (Nginx on Ubuntu/DigitalOcean)**

1) Build locally or on server

- `npm ci && npm run build`
- Copy `dist/` to server (e.g., `/var/www/aayushkushwaha.com/dist`)

2) Nginx config (SPA-friendly)

```
server {
    server_name aayushkushwaha.com www.aayushkushwaha.com;

    root /var/www/aayushkushwaha.com/dist;
    index index.html;

    # Gzip/static
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: proxy API (contact form backend)
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;  # FastAPI backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    listen 80;
}
```

3) Enable TLS with Certbot

- `sudo apt-get install -y certbot python3-certbot-nginx`
- `sudo certbot --nginx -d aayushkushwaha.com -d www.aayushkushwaha.com`

4) Systemd service for backend (if used)

- Run your FastAPI backend (e.g., `uvicorn main:app --host 127.0.0.1 --port 8000`)

---

**Customization**

- Accent color: Tailwind theme `colors.accent` (#006341)
- Theme mode: class-based (`dark` on `<html>`) with localStorage persistence
- Update content in `src/pages/` and links in `src/components/Footer.tsx` and `src/pages/Home.tsx`

---

**SEO**

- Meta tags in `index.html` include description, keywords, OpenGraph/Twitter cards
- Add real social preview image later (replace `/placeholder.svg`)

---

**Notes**

- Contact form posts to `/api/contact`; ensure your backend handles JSON `{ name, email, message }` and CORS if cross-origin.
- If deploying as a subpath, adjust router or Nginx accordingly.

# aayush_website_updated

