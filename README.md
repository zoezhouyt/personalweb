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

Twelve legs, 2020 to now. Education, then ASES and Fosun, then the 2026 cluster:
Ghai's lab, LinkSea, Miku, Hyperknow, ByteDance, Noetic, Litovsky's lab, and the
dissertation last.

Miku's leg is the centre of gravity. Two prototypes were stopped on purpose and the
page says why, because the reasoning is the evidence of judgement. Its entry states
plainly that no child has used it and there is therefore no claim it works.

Nested output rows carry a small square where a thumbnail belongs. They currently show
a two-character mark. Real screenshots drop straight in.

## The atlas

The brain is back, redrawn in the page's own idiom. It is not the dark specimen plate
of the earlier version; that clashed with the ivory restraint of this layout. It is a
hairline figure in the right margin, drawn in the same grey as the body text at low
alpha, with one region lit in oxblood.

Every entry and section carries a `data-region`. An `IntersectionObserver` watches them,
and when one becomes the active entry the camera eases to the yaw and pitch that turn
that region to face you, while the caption underneath names it.

Nine regions are in use, so nothing in the atlas is decorative:

| Region | Holds |
|---|---|
| Temporal lobe | About, the three accents |
| Hippocampus | Woldingham |
| Parietal cortex | LSE and its methods |
| Temporoparietal junction | ASES, Hyperknow, Noetic |
| Orbitofrontal cortex | Fosun |
| Occipital cortex | LinkSea |
| Motor cortex | Miku, ByteDance |
| Prefrontal cortex | Litovsky, the dissertation, Now |
| Cerebellum | Off hours |

Two things that were wrong and are worth remembering. Lighting whole fibres painted
lines clean across the drawing, because a fibre is a long arc; lighting is decided per
segment now. And a nearest-anchor partition handed whole lobes to single regions, so a
third of the figure lit at once; it is a fixed radius around the anchor instead.

The geometry is unchanged from `prototypes/brain-scroll.html`: a metaball field for the
cerebrum and cerebellum, creases cut for the lateral fissure and central sulcus, and
fibres walked along contour lines of a noise field to produce gyri. No WebGL, no model
file, no library.

Hidden below 80rem, where there is no margin to put it in.

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
