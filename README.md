# personalweb

Zoe Zhou's personal site. One self-contained HTML file, no build step, no framework.

## The idea

The site follows the structure and aesthetic of [mikes.cv](https://www.mikes.cv/):
a fixed identity rail at the far left with coordinates and a live London clock, one
narrow reading column, hairline rules, very small type, and tiny uppercase mono labels
on an ivory ground. An About essay carries its credentials in numbered footnotes rather
than in the prose. A Flight plan lists the legs. A Now section holds four numbered
items. Off hours closes it.

Content is ordered by **date**, oldest first, not by location. Earlier drafts used
airport codes as the organising grammar; that is gone. The one deliberate departure
from the reference is the accent, which is Zoe's oxblood rather than its periwinkle.

The audience is graduate admissions readers in learning design and learning
engineering, not recruiters.

## Flight plan

Nine entries in three year groups, newest first.

**2026** Miku, Noetic, the LSE assistantships, Hyperknow, ByteDance, LinkSea.
**2025** ASES London, Fosun. **2024** Women in Entrepreneurship.

The year is the structure. A large numeral sits in the left margin, sticky, holding the
middle of the viewport while its entries pass, and turning oxblood while its group is
the one being read. Months are gone; the group year is the only date.

The rail is **one drawn SVG path**, not a stack of straight lines. It runs down each
year, then sweeps across to the next on a long cubic curve, 56px of travel across 128px
of drop, with the control points at 0.62 of the gap so it holds its vertical and then
turns hard through the middle.

Everything rides that path rather than approximating it. The cursor's position comes
from bisecting `getPointAtLength` for the length whose y matches the middle of the
viewport, which gives the exact x on the curve; the dot and the brain are placed there
each frame, so they lean through the bend instead of jumping between rails. Each
entry's dot is placed the same way at its own y. The travelled portion is the same path
drawn again in oxblood, revealed with `stroke-dasharray`, so the fill follows the curve
by construction. The untravelled part is a solid hairline, not dashed: the reference
dashes its rail, but on a curve at hairline contrast the gaps read as the line being
broken rather than as a style.

Two entries hold more behind a disclosure: the LSE entry opens into the Litovsky and
Ghai projects, and ASES opens into the bootcamp, sponsorship and Stanford summit. Any
output row can take the same treatment.

Education, the dissertation and the Now section are deliberately absent. The first two
are in the About footnotes; the third said nothing the entries did not.

All of the rail furniture is hidden below 66rem, where there is no margin for it.

## The atlas

The brain rides the cursor. It sits immediately right of the travelling dot, at 8rem
square, drawn as hairlines in the body grey with one region lit in oxblood and named
underneath. It was in the right margin before; putting it on the rail gives it a reason
to be where it is and frees the whole right side for text.

Every entry and section carries a `data-region`. An `IntersectionObserver` watches them,
and the camera eases to the yaw and pitch that turn that region to face you.

| Region | Holds | Shown as |
|---|---|---|
| Hippocampus | Miku | where learning turns into memory |
| Temporoparietal junction | Noetic, Hyperknow, ASES, WiE | taking someone else's point of view |
| Prefrontal cortex | the LSE assistantships | judgement, and knowing what you know |
| Motor cortex | ByteDance | turning a decision into action |
| Occipital cortex | LinkSea | making sense of what you see |
| Orbitofrontal cortex | Fosun | working out what something is worth |
| Temporal lobe | About | language, and the meaning carried in it |
| Cerebellum | Off hours | timing, and skill built by repetition |

The third column is printed under the brain, because a region name on its own means
nothing to a reader who has not studied neuroscience.

The parietal anchor is defined but unused since the LSE entry went. Harmless, and there
if something numerical earns it later.

Three things that were wrong and are worth remembering. Lighting whole fibres painted
lines clean across the drawing, because a fibre is a long arc; lighting is per segment
now. A nearest-anchor partition handed whole lobes to single regions, so a third of the
figure lit at once; it is a fixed radius around the anchor instead. And the cursor sat
104px off the rail, because elements in normal flow inherit the timeline's left padding
while absolutely positioned ones do not.

The geometry is unchanged from `prototypes/brain-scroll.html`: a metaball field for the
cerebrum and cerebellum, creases cut for the lateral fissure and central sulcus, and
fibres walked along contour lines of a noise field to produce gyri. No WebGL, no model
file, no library.

## Writing rules

The copy follows Zoe's own rules, which are not optional:

- UK spelling. **No em dashes anywhere**, including CSS comments.
- At most two "not X, but Y" or "rather than" contrasts in the whole page.
- At most two paragraphs ending on an aphorism. End the others on a fact.
- No staged openers, no reflexive lists of three, no stock phrases.
- Precise numbers over adjectives. Vary sentence length.
- **Never invent a fact, number, outcome or quote.** Anything unverified stays off
  the page rather than going on as a guess.

## Files

```
index.html                        the site
prototypes/brain-scroll.html      the brain version, kept for the next stage
prototypes/flightplan-v1.html     the first flight plan, organised by airport code
prototypes/map-to-brain.html      the fold test
archive/                          earlier versions, not part of the live site
.nojekyll                         serve files as-is, no Jekyll
```

Files in `archive/`, and `prototypes/brain-scroll.html`'s ancestors, were written for
the Claude Artifact platform, which wraps pages in its own document skeleton. Some have
no doctype of their own and will render in quirks mode if opened directly.

## Local preview

```
python3 -m http.server 4321 --directory .
```

Then open http://localhost:4321. Append `?v=2` to bypass the browser cache after an edit.


## Case pages

Each output row on the flight plan that has a page of its own links to a folder
under `case/`:

| Row | Page |
|---|---|
| Where Miku stands | `case/miku/` |
| The Nebius day | `case/nebius/` |
| Portuguese healthcare operator | `case/fosun-portugal/` |
| German life insurance | `case/fosun-germany/` |

They are stubs. Each carries the paragraph that is already on the flight plan,
a note saying the case study is still being written, and an HTML comment holding
the scaffold to fill in. Every one of them is `<meta name="robots" content="noindex">`
on purpose; take that line out when the page is finished.

They share `assets/case.css`. `index.html` keeps its styles inline because it is
the page that has to paint in one request, so the tokens exist in two places. If
a colour changes, change it in both.

## Photo plates

The sign-off ends on four 4:5 plates fed from `assets/photos/`. See the README in
that folder for the filenames. A plate with no file renders as an empty block,
not a broken image, so the page is safe to ship before the photos arrive.

## Why not React or three.js

Asked and considered, November 2026. The page is one file of about 45KB with no
build step. three.js is roughly 170KB gzipped and React about 45KB plus a
toolchain; the content security policy in `vercel.json` is `script-src 'self'`,
so a CDN would mean loosening it; and a client-rendered page is a blank screen
when the script fails. The brain is a Canvas 2D hairline drawing on purpose, to
match the rules and hairlines everything else is built from.
