# personalweb

Zoe Zhou's personal site. One self-contained HTML file, no build step, no framework.

## The idea

The site follows the structure and aesthetic of [mikes.cv](https://www.mikes.cv/):
a fixed identity rail at the far left carrying three cities with coordinates and live
local time (coordinates only, with `format-detection` off, so iOS does not turn them
into tappable addresses), one narrow reading column, hairline rules, very small type, and tiny
uppercase mono labels on a near-white ground. An About essay carries its credentials in
margin notes: the citation is a mark in the text and the note appears in the left gutter
beside the line it belongs to, on hover, focus or tap. Below 66rem there is no gutter,
so the note opens under the line instead. A Flight plan lists the legs. A sign-off
closes it.

Content is ordered by **date**, newest first, not by location. Earlier drafts used
airport codes as the organising grammar; that is gone. The one deliberate departure
from the reference is the accent, which is Zoe's oxblood rather than its periwinkle.

The audience is graduate admissions readers in learning design and learning
engineering, not recruiters.

## Flight plan

Eight entries in three year groups, newest first.

**2026** Miku, the LSE assistantships, LinkSea, Noetic, ByteDance.
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
by construction. The route ahead is dotted and the part already flown is drawn solid
over it. The dots are a near-zero `stroke-dasharray` with round caps, not dashes: an
earlier version used dashes and at hairline contrast the gaps read as the line being
broken rather than as a style.

### What an entry shows

Three things are visible without any interaction: the name, the role and year, and one
sentence. Next to them is the organisation's mark. Then come the links, which navigate,
and then the Explore control, which does not: a reader never has to guess whether a
click will move them.

Explore is a `<summary>`, which browsers expose as a button carrying its own expanded
state, so the fold needs no script and works with none. All the folds share a `name`, so
opening one closes the rest; the handful of browsers without `details[name]` get the
same behaviour from a few lines in `index.html`. A deep link such as
`/#experience-miku` opens that entry on arrival.

The LSE entry is the exception: two disclosures, one per supervisor, sitting under its
one-line description. A single breakdown would have made a reader open both projects to
find either, and the two are separate research with separate aims.

Fosun and Women in Entrepreneurship are single lines with nothing behind them.

## The atlas

The brain rides the cursor. It sits immediately right of the travelling dot, at 8rem
square, drawn as hairlines in the body grey with one patch lit in oxblood and named
underneath. It was in the right margin before; putting it on the rail gives it a reason
to be where it is and frees the whole right side for text.

**It maps three categories, not nine jobs.** The first version tagged every entry with
its own brain region, so Miku sat under the anterior prefrontal cortex and ByteDance
under the basal ganglia. That was removed: a region per job asserted a relationship
nothing supports, and it read as a taxonomy when it was only a motif. What replaced it
is coarser and honest about being a grouping.

| Category | Holds | Region | Shown as |
|---|---|---|---|
| Entrepreneurship | Miku, Noetic | Motor cortex | turning a decision into something that moves |
| Research | the LSE assistantships | Prefrontal cortex | weighing how well you know something |
| Work | LinkSea, ByteDance, Fosun | Parietal cortex | holding a structure in mind while you change it |
| Leadership | ASES London, Women in Entrepreneurship | Temporoparietal junction | seeing it from where someone else is standing |

These are **the CV's own headings**, so the two documents sort her work the same way. An
earlier pass used Tech, Psychology and Finance, which agreed with nothing else she sends
out. The list itself stays in date order: the categories group the work without breaking
the chronology, which is the only structural idea the page has.

The category is the content and the anatomy is the picture attached to it. Of the four,
only orbitofrontal cortex and value is a standard association; the rest are metaphors
and the page does not pretend otherwise. **Do not go back to one region per entry.**

The label is printed under the drawing and nowhere else. It was briefly on each entry
too, ahead of the role, and taken off again: the grouping is a way of arranging the
page, not a fact about a job, and spelling it out on every row made it look like one.

The four anchors are chosen to be far apart on the drawing as well as sensible:
prefrontal is anterior and superior, motor superior and central, parietal posterior and
superior, the temporoparietal junction posterior and lateral. The nearest pair sits 45
degrees apart,
mirrored seats included, against a lit patch about 21 degrees wide, so two categories
never light overlapping ground. `build.mjs` prints nothing about this, so if you move an
anchor, check the separation by hand.

`content/experiences.json` holds the table and every entry's `category`. `build.mjs`
writes the table into `index.html` between the `categories` markers and `data-category`
onto each entry, so the drawing and the labels cannot drift apart. An
`IntersectionObserver` watches the entries; whichever is crossing the middle of the
viewport sets the lit patch and eases the camera round to face it.

The lit patch is an angular neighbourhood of the anchor's direction rather than a sphere
around the point, which is what lets an anchor sit below the surface and still light the
cortex above it. Lit is decided per segment, not per fibre: a fibre is a long arc, and
lighting a whole one paints a line clean across the drawing.

The drawing itself is unchanged: a metaball field for the cerebrum and the cerebellum, a
bisection out to the implied surface, and fibres that walk it following the contours of a
gyral noise function. The seed is fixed, so the same brain is drawn every time.

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
content/experiences.json          the flight plan, in one place
content/case-studies/*.json       one file per /work page
build.mjs                         reads those, writes the pages. node build.mjs
index.html                        the site. Its flight plan is generated
work/index.html                   generated index of the case studies
work/<slug>/index.html            generated case studies
assets/work.css                   shared by every /work page
sitemap.xml                       generated, indexable routes only
robots.txt, 404.html              hand-written
vercel.json                       headers, clean URLs, the /case redirects
prototypes/, archive/             earlier versions, not part of the live site
.nojekyll                         serve files as-is, no Jekyll
```

`content/` and `build.mjs` are in `.vercelignore`: the pages they produce are committed
and served, the sources are for editing.

### Dates

Every entry carries a `dates` string taken from the CV, not a bare year, so a reader can
tell ten weeks from a year. The two LSE assistantships ran at different times and each
sub-fold carries its own. Women in Entrepreneurship is the one entry with no months: it
is not on the October 2026 CV at all, and `build.mjs` prints that as an open TODO.

### The end block

The three clocks used to sit at the top of the rail, above the navigation, in the best
corner of the page. They are now at the foot, where a reader who wants to propose an hour
can see what time it is for her. `data-home` on the `.clocks` list names the zone she is
in: that city moves to the top of the list, takes the accent, and drives the big stamp.
Change that one attribute when she moves.

## Local preview

```
python3 -m http.server 4321 --directory .
```

Then open http://localhost:4321. Append `?v=2` to bypass the browser cache after an edit.


## Content and the build

The site is still static HTML with no framework and no deploy-time build. Vercel serves
these files as they are. The one addition is a generator that is run by hand and whose
output is committed:

```
node build.mjs
```

It reads `content/experiences.json` and `content/case-studies/*.json` and writes the
flight plan into `index.html` between the `<!-- flight-plan:start -->` markers, a page
for every case study under `work/`, and `sitemap.xml`. It prints the open content TODOs
when it finishes. It has no dependencies and `node_modules` does not exist here.

**Edit the JSON, not the generated HTML.** A change made in `index.html` between the
markers is lost on the next build. Section bodies are authored HTML: paragraphs split on
a blank line and inline markup passes through.

A case-study section renders only if its `body` has text, so an unwritten section is
absent rather than showing a placeholder. `editorTodo` is for the author and is never
sent to a visitor. A page with any TODO left carries one short "still being written"
line instead. `status: "draft"` keeps a page out of the sitemap and adds `noindex`;
`in-progress` and `published` are indexable. That is why LinkSea and the ASES bootcamp
are currently unlisted and Miku and Nebius are not.

The pages used to live at `/case/miku` and `/case/nebius`. Those two URLs now 308 to
`/work/...` from `vercel.json`, so nothing that was ever linked breaks.

## Photo plates

Two sets, both safe to ship before the photos arrive.

The sign-off ends on four 4:5 plates fed from `assets/photos/`. A plate with no
file renders as an empty block, not a broken image.

Every flight plan entry carries a 4:3 thumbnail, and a fold may hold one or two
16:10 photos behind it, all from `assets/photos/flightplan/`. The thumbnails are the
organisations' logos, contained rather than cropped, sitting on the page with no plate
and no border. The white grounds were cut out of the PNGs themselves by flooding in
from the edges, which keeps white that belongs to the mark, such as the letters inside
the LSE square. Two marks are solid colour to the edge, LSE and Noetic, and are meant
to look like blocks.

**A dark-on-transparent mark disappears in dark mode.** LinkSea's wordmark and the word
under the TikTok note are both nearly invisible on the dark page. The fix is a
light-on-dark variant of those two files, served from a `<picture>` on
`prefers-color-scheme`, not a plate behind them. The 16:10 slots are still empty: each prints the filename it wants
and a line saying what belongs there, so an unfilled flight plan is still a shot
list. Both folders have a README naming every file.

The fallback is the same in both cases: `index.html` listens for the image's
`error` event and marks the plate, which hides the broken `img` and leaves the
placeholder showing. With JavaScript off a missing photo shows its alt text
instead, which is the same description the placeholder prints.

## Why not React or three.js

Asked and considered, November 2026. The page is one file of about 45KB with no
build step. three.js is roughly 170KB gzipped and React about 45KB plus a
toolchain; the content security policy in `vercel.json` is `script-src 'self'`,
so a CDN would mean loosening it; and a client-rendered page is a blank screen
when the script fails. The brain is a Canvas 2D hairline drawing on purpose, to
match the rules and hairlines everything else is built from.
