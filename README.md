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

Eight entries in two year groups, newest first. The year is the structure: a large
numeral sits in the left margin, sticky, and holds the middle of the viewport while its
entries scroll past. It turns oxblood while its group is the one you are reading, so
the year visibly changes over. Months are gone; the group year is the only date.

2026 holds Miku, Noetic, a research assistantship, Hyperknow, ByteDance, LinkSea and a
second research assistantship. 2025 holds Fosun.

ASES London is not an entry of its own. It sits inside Noetic as an expandable row,
since it is the programme that came before it. Any output row can take the same
treatment.

Education and the dissertation are deliberately absent. All three are stated in the
About essay and its footnotes, so entries for them added length without adding
anything.

The rail is interactive: a cursor dot holds the middle of the viewport and travels down
it, the rail fills behind it, and each entry's dot moves through ahead, current and
passed. All of the furniture is hidden below 66rem, where there is no margin for it.

## The atlas

The brain rides the cursor. It sits immediately right of the travelling dot, at 8rem
square, drawn as hairlines in the body grey with one region lit in oxblood and named
underneath. It was in the right margin before; putting it on the rail gives it a reason
to be where it is and frees the whole right side for text.

Every entry and section carries a `data-region`. An `IntersectionObserver` watches them,
and the camera eases to the yaw and pitch that turn that region to face you.

| Region | Holds |
|---|---|
| Hippocampus | Miku |
| Temporoparietal junction | Noetic, Hyperknow |
| Prefrontal cortex | the Litovsky assistantship, Now |
| Motor cortex | ByteDance |
| Occipital cortex | LinkSea |
| Temporal lobe | the Ghai assistantship, About |
| Orbitofrontal cortex | Fosun |
| Cerebellum | Off hours |

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
