# Paula — Operations Manual

A static, single-page user manual for **Paula** (Cairo 3A Slaughterhouse Optimization, Module 4: Dual-Mode Optimization Engine).

Built with vanilla HTML + CSS + JS — no framework, no build step, no dependencies.

---

## What's inside

| File / folder        | Purpose                                                   |
|----------------------|-----------------------------------------------------------|
| `index.html`         | Page structure and content                                |
| `styles.css`         | Paula-branded design system, layout, responsive rules     |
| `app.js`             | Marker ↔ callout sync, lightbox, sidebar active state     |
| `screenshots/`       | The five page screenshots (PNG)                           |
| `.nojekyll`          | Tells GitHub Pages to skip Jekyll processing              |

---

## View locally

Just open `index.html` in a browser.

Or, if you want hot-reload while editing:

```bash
# Python
python -m http.server 8080
# Node
npx serve .
```

Then open <http://localhost:8080>.

---

## Deploy to GitHub Pages

Because the site is fully static, deployment is one push + a setting:

1. Create a new GitHub repo (public).
2. Push these files to `main`:
   ```bash
   git init
   git add .
   git commit -m "feat: initial Paula operations manual"
   git branch -M main
   git remote add origin https://github.com/<your-org>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** · folder: **/ (root)**
   - Save
4. After ~30 seconds your site is live at `https://<your-org>.github.io/<repo-name>/`.

No GitHub Actions workflow is required — GH Pages serves the files directly.

---

## Updating content

### Edit text or add a section

Open `index.html` — every section is a `<section>` block. Sections are listed in the sidebar via the `<nav>` block at the top.

### Add or replace a screenshot

1. Drop the new PNG into `screenshots/`.
2. Reference it in the relevant `<section>` via `<img src="screenshots/...">`.
3. Place numbered markers using percentages from the top-left of the image:
   ```html
   <div class="marker" style="--x:50%; --y:25%;" data-id="my-1">1</div>
   ```
4. Add the matching callout to the same section's `<ol class="callouts">`:
   ```html
   <li data-id="my-1">
     <strong>Title</strong>
     <span>Explanation.</span>
   </li>
   ```
5. The `data-id` attribute is what links the marker to the callout (hover either to highlight both).

### Re-shoot the screenshots

In the main Paula app repo, the screenshots come from:

```
docs/screenshots/
```

If you regenerate them (e.g. after a UI change), copy the new PNGs into this repo's `screenshots/` folder and commit.

---

## Design system

The styles use CSS custom properties at the top of `styles.css` — change brand colours, radii, shadows, etc. in one place.

Sampled directly from the Paula Figma file (Cairo 3A — Module 4).

| Token                    | Default      | Notes                          |
|--------------------------|--------------|--------------------------------|
| `--brand-primary`        | `#2D73C9`    | Paula blue (KPIs, primary CTA) |
| `--brand-primary-bg`     | `#E9F0F9`    | Soft blue tint                 |
| `--brand-navy`           | `#153A6C`    | Subheads, Heavy bar            |
| `--accent-red`           | `#E5252A`    | Run Optimization, alerts       |
| `--accent-red-bg`        | `#FDE8E7`    | Below-FC row tint              |
| `--status-success`       | `#01A669`    | Best row, positive deltas      |
| `--bg-page`              | `#FAFAFB`    | Page background                |
| `--bg-card`              | `#FFFFFF`    | Card background                |
| `--text-primary`         | `#111827`    | Body text                      |
| `--text-secondary`       | `#4B5563`    | Lede / callout body            |

---

## Features

- **Sidebar navigation** with active-section highlight on scroll
- **Annotated screenshots** — numbered markers synced to a callout list (hover either to highlight both, click marker to jump)
- **Lightbox** — click any screenshot to zoom; Esc or click backdrop to close
- **Smooth scroll** between sections
- **Fade-in on scroll** for sections (Intersection Observer)
- **Mobile-responsive** — sidebar collapses behind a hamburger button at < 768 px
- **Keyboard-accessible** — markers are focusable, Enter / Space activate them

---

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses `backdrop-filter`, CSS grid, custom properties, and Intersection Observer — all widely supported since 2020.

---

Version 1.0 · May 2026
