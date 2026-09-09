# dantonio.eu — V1

Static one-page site ready for GitHub Pages.

## Local preview
Run a local server from this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages
1. Create a GitHub repository and upload all files in this folder.
2. In GitHub: Settings → Pages → Deploy from a branch → `main` / root.
3. Add the custom domain `www.dantonio.eu` (or `dantonio.eu`).
4. Configure Aruba DNS according to GitHub Pages custom-domain instructions.
5. Enable **Enforce HTTPS** once the certificate is issued.

## Main files
- `index.html` — content and semantic structure
- `styles.css` — full responsive design
- `script.js` — mobile navigation and subtle reveal animation
- `assets/images/` — web-optimised images
- `assets/docs/` — Executive CV PDF
