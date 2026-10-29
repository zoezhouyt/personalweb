# zoezhouyt.github.io

Zoe Zhou's personal website. Live at **https://zoezhouyt.github.io**

## What's here

| File | What it is |
|---|---|
| `index.html` | The whole site — markup, styles and script in one file. This is the only file that matters. |
| `archive/` | Earlier versions, kept for reference. Not part of the live site. |
| `.nojekyll` | Tells GitHub to serve the files as-is instead of running them through Jekyll. |

There is no build step and nothing to install. The page is one self-contained HTML file;
the only thing it loads from elsewhere is the webfonts from Google Fonts.

## How it works

The site is an eight-chapter scroll narrative. A generated brain sits on the left and
turns to face the relevant region as each chapter comes into view.

The brain is not a 3D model file. It is generated in the browser from a mathematical
description: overlapping gaussian blobs define the cerebrum and cerebellum, two creases
are cut for the lateral (Sylvian) fissure and the central sulcus, and roughly 500 fibres
are walked across that surface following contour lines of a noise field, which is what
produces the gyri. It is drawn as strokes in a 2D canvas, so there is no WebGL and no
library — the whole page is about 40 KB.

Chapters are tagged with `data-region` in the markup. An `IntersectionObserver` watches
them and, when one becomes the active chapter, the camera eases to the yaw and pitch that
bring that region's anchor point round to face the viewer.

## Editing it

Everything is in `index.html`:

- **Text** — the chapters are plain HTML near the middle of the file, inside `<section class="chapter">`.
- **Colours** — the `:root` block at the top of `<style>`. Region colours live in the
  `REGIONS` object in the script.
- **Brain shape** — the `CEREBRUM` and `CEREBELLUM` arrays in the script.

Commit to `main` and GitHub Pages redeploys within a minute or so.
