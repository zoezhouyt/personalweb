# personalweb

Zoe Zhou's personal site. One self-contained HTML file, no build step, no framework.

## The idea

The site is a **cognitive map**: a brain you navigate, where each region holds the part
of the work that region is actually responsible for. It is not decoration. The mapping
is defensible because each region's best-established function corresponds honestly to
what is filed under it, and the footer says plainly that strict localisation is a
simplification.

The second metaphor is the journey. "Cognitive map" is a real term in psychology
(Tolman, 1948), and the hippocampus handles spatial navigation and episodic memory with
the same machinery. So for someone who has lived in several countries and who studies
how minds build maps, travel and learning are the same structure seen twice. That is
the join, and it is why the opening chapter is about places.

The audience is graduate admissions readers in learning design and learning
engineering, not recruiters. That decides what leads and what gets demoted.

## Structure

Eight chapters. The brain is sticky on the left at laptop width; the story scrolls on
the right. Each chapter carries a `data-region` attribute, an `IntersectionObserver`
watches them, and the camera eases to the yaw and pitch that bring that region round to
face the viewer.

| # | Chapter | Region | Why that region |
|---|---|---|---|
| 01 | Beijing, Abu Dhabi, London | Temporal lobe | Language comprehension |
| 02 | Reading psychology at LSE | Hippocampus | Encoding and consolidation |
| 03 | The question I keep returning to | Prefrontal cortex | Judgement about one's own judgement |
| 04 | Evidence, not plausibility | Parietal cortex | Number sense, intraparietal sulcus |
| 05 | Case studies | Premotor & motor cortex | Intention becoming action |
| 06 | Designing the room people learn in | Temporoparietal junction | Perspective-taking |
| 07 | Adjacent work | Orbitofrontal cortex | Value-based decision-making |
| 08 | Away from the desk | Cerebellum | Timing and procedural learning |

Chapter 5 is the centre of gravity. Each case study follows the shape a learning
engineering programme asks for: the problem, my role, what the design rests on, what I
built, **the evidence and its limits**, and what I would test next. Stating what the
evidence does not cover is the point, not a hedge.

## How the brain is drawn

There is no 3D model file and no WebGL. The shape is generated in the browser:

- Overlapping gaussian blobs (a metaball field) define the cerebrum and cerebellum.
  A binary search along each ray finds the surface.
- Two creases are cut into that surface for the lateral (Sylvian) fissure and the
  central sulcus. Those landmarks are what make it read as a brain rather than a blob.
- Around 500 fibres are walked across the surface following **contour lines of a noise
  field**, which is what produces parallel bands that look like gyri.
- Everything is stroked into a 2D canvas, depth-sorted front and back, and coloured by
  region.

`prototypes/map-to-brain.html` tests the unbuilt idea: the same fibres laid flat as
edge-bundled flight paths between cities, folding into the cortex. Fibre colour stays
constant, so it is a leg of the journey at one end and a brain region at the other.
Not yet wired into the site.

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
prototypes/map-to-brain.html      the fold test, standalone
archive/                          earlier versions, not part of the live site
.nojekyll                         serve files as-is, no Jekyll
```

The two files in `archive/` were written for the Claude Artifact platform, which wraps
pages in its own document skeleton, so they have no doctype of their own and will
render in quirks mode if opened directly. They are kept for reference only.

## Editing

Everything is in `index.html`. Chapter text is plain HTML in the middle of the file.
Colours are tokens in the `:root` block at the top of `<style>`; region colours are in
the `REGIONS` object in the script. Brain shape is the `CEREBRUM` and `CEREBELLUM`
arrays.

Commit to `main` and GitHub Pages redeploys.
