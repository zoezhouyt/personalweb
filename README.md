# personalweb

Zoe Zhou's personal site. One self-contained HTML file, no build step, no framework.

## The idea

The site is a **flight plan**. Zoe grew up between Beijing, Abu Dhabi and Riyadh before
boarding school and LSE, so the journey is not a borrowed metaphor; it is the actual
shape of the story. Each leg of the page is a leg of that journey, marked with airport
codes and a year, and what she did there sits beside it.

The structure is borrowed from [mikes.cv](https://www.mikes.cv/): a fixed identity rail,
a vertical plan of legs, route codes as the navigation grammar, and a personal coda at
the end once the professional case is closed. The execution is not borrowed. That site
is monochrome Helvetica; this one uses Zoe's own palette of oxblood, terracotta, olive
and slate on warm paper, with Fraunces for display.

The audience is graduate admissions readers in learning design and learning
engineering, not recruiters. That decides what leads and what gets demoted.

## Structure

| Leg | Route | When | What |
|---|---|---|---|
| 1 | PEK | before 2020 | Beijing, Abu Dhabi, Riyadh. Three accents. |
| 2 | AUH › LON | 2020–2024 | Boarding school |
| 3 | LON | 2024–2027 | LSE, Psychological and Behavioural Science |
| 4 | LON › SFO | 2025–2026 | ASES London and Stanford |
| 5 | LON | 2025–2026 | Fosun, private equity |
| 6 | LON | 2026 | Research: Schneider, Litovsky, Ghai |
| 7 | LON › HKG | 2026 | Three prototypes, two of them stopped |
| 8 | LON | 2026– | Noetic, ByteDance, Hyperknow |

Then **Arrivals**, which is the personal half, and contact.

Leg 7 is the centre of gravity. Two prototypes were stopped on purpose and the page
says why, because the reasoning is the evidence of judgement. Miku's entry states
plainly that no child has used it and that there is therefore no claim it works.

## The brain, parked

`prototypes/brain-scroll.html` is the previous version: a generated brain, sticky on
the left, turning to the region that holds each chapter. The geometry is a metaball
field for the cerebrum and cerebellum, two creases cut for the lateral fissure and
central sulcus, and around 500 fibres walked along contour lines of a noise field to
produce gyri, all stroked into a 2D canvas. No WebGL, no model file.

`prototypes/map-to-brain.html` tests folding one into the other: the same fibres laid
flat as bundled flight paths between cities, then folded into the cortex.

The plan is to bring the brain back on top of the flight plan rather than instead of
it. Build the journey first, then let it fold.

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
