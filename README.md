# CDEFGAB Music Toolkit — website

Static marketing + documentation site for the iOS app **CDEFGAB Music Toolkit**.
No build step, no dependencies, no framework — plain HTML, one CSS file and one small JS file.
It runs as-is on **free GitHub Pages**.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page |
| `guide.html` | User Guide — **linked from inside the app** |
| `privacy.html` | Privacy Policy — **used as the Privacy Policy URL in App Store Connect** |
| `support.html` | Support + FAQ — **used as the Support URL in App Store Connect** |

## Publishing on GitHub Pages

Repository: <https://github.com/GuitarWizardApp/cdefgab_music_toolkit>
Live at: **<https://guitarwizardapp.github.io/cdefgab_music_toolkit/>**

1. Copy everything from this folder into the repository root (including the hidden `.nojekyll`) and push.
2. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder: `/ (root)`.
3. Wait for the green check — the first deploy usually takes a minute or two.

The `.nojekyll` file is intentional — it stops GitHub from running Jekyll, which would
otherwise ignore some files and slow deploys.

## URLs already wired up

| Where | Value |
|---|---|
| App Store Connect → App Information | Privacy Policy URL → `https://guitarwizardapp.github.io/cdefgab_music_toolkit/privacy.html` |
| App Store Connect → Version | Support URL → `.../support.html` · Marketing URL → `.../index.html` |
| iOS app — `GuideViewController.userGuideURL` | `.../guide.html` ✅ set |
| iOS app — `ProAccess.privacyURL` | `.../privacy.html` ✅ set |

Both app-side URLs live in the binary, so changing them later needs a new build.

## Assets

* `assets/screens/*.png` — app screenshots used across the pages.
* `assets/videos/*.mp4` — short screen recordings. They are lazy-loaded (`preload="none"`) and
  only play while scrolled into view, so they cost nothing until seen.
* `assets/favicon.svg`, `assets/og.svg` — icon and social card, drawn as SVG so they stay crisp.

To swap a screenshot, drop a new PNG in `assets/screens/` under the same filename — no code changes.

## Design

Colours mirror the app exactly (`AppMenuStyling.swift`):

| Token | Value | Used for |
|---|---|---|
| `--lime` | `#E0F500` | primary accent, dark appearance |
| `--accent` (light) | `#96A300` | primary accent, light appearance |
| `--orange` | `#FF8C00` | tonic accent / rings |
| `--sky` / `--red` | `#007EF5` / `#F53E33` | rhythm module accents |

The site follows the system light/dark appearance and offers a manual toggle, which is
remembered in `localStorage`. Motion is disabled automatically for visitors who ask for
reduced motion.

## Local preview

Any static server works, e.g.:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.
