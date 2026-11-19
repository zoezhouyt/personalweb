/* Build step for zoezhouyt.com.
 *
 * The site is static HTML with no framework and no deploy-time build: Vercel
 * serves the files in this repository as they are. This script is run by hand
 * and its output is committed, so the content lives in one place without the
 * page paying for a toolchain.
 *
 *   node build.mjs
 *
 * It reads content/experiences.json and content/case-studies/*.json and writes:
 *   - the flight plan, spliced into index.html between the flight-plan markers
 *   - work/<slug>/index.html for every case study
 *   - sitemap.xml, listing only the routes that are indexable
 *
 * Section bodies are authored HTML: paragraphs split on a blank line, inline
 * markup passes through. editorTodo is never rendered to a visitor.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const SITE = "https://zoezhouyt.com";
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), "utf8"));
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const paras = (body) =>
  String(body || "").trim().split(/\n\s*\n/).filter(Boolean).map((p) => `<p>${p.trim()}</p>`).join("\n");
const written = [];
function out(rel, text) {
  const abs = join(ROOT, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, text, "utf8");
  written.push(rel);
}

/* ---------- shared pieces ---------- */

function plate(img, kind) {
  // A slot renders its filename and description until the file exists, so an
  // empty plate still says what belongs there.
  const file = img.src.split("/").pop();
  const cap = img.caption || img.alt;
  return (
    `<span class="shot shot-${kind}"><span class="shot-in">` +
    `<em>${esc(file)}</em><span class="cap">${esc(cap)}</span>` +
    `<img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy" decoding="async">` +
    `</span></span>`
  );
}
const plates = (images, kind = "x") =>
  !images || !images.length ? "" : `\n<div class="plates">\n${images.map((i) => plate(i, kind)).join("\n")}\n</div>`;

const link = (l) =>
  `<a class="cta${l.external ? " out" : ""}" href="${esc(l.href)}"` +
  (l.external ? ' rel="noopener noreferrer"' : "") +
  `>${esc(l.label)}</a>`;

/* ---------- the flight plan ---------- */

function body(xp) {
  const hs = (xp.highlights || [])
    .map((h) => `<h5>${esc(h.heading)}</h5>\n${paras(h.body)}`)
    .join("\n");
  return `${hs}${plates(xp.images)}`;
}

// <details name> gives an accordion with no script; the fallback in index.html
// closes the others where the browser does not support the attribute. The
// summary is the control, so it carries the expanded state for free.
function fold(id, inner, label) {
  const head = label
    ? `<b>${esc(label.heading)}</b>${label.note ? `<span>${esc(label.note)}</span>` : ""}`
    : `<span class="xp-toggle"></span>`;
  return (
    `<details class="fold${label ? "" : " plain"}" name="flight-plan" id="more-${esc(id)}">\n` +
    `<summary>${head}</summary>\n` +
    `<div class="fold-body">\n${inner}\n</div>\n</details>`
  );
}

function row(xp) {
  const parts = [];
  parts.push(
    `<article class="xp" id="experience-${esc(xp.id)}" data-category="${esc(xp.category || "")}">`
  );
  parts.push(`<span class="tl-dot" aria-hidden="true"></span>`);
  parts.push(`<div class="xp-grid">`);
  if (xp.thumbnail) {
    parts.push(
      `<span class="shot shot-t logo"><span class="shot-in">` +
        `<img src="${esc(xp.thumbnail.src)}" alt="${esc(xp.thumbnail.alt)}" loading="lazy" decoding="async">` +
        `</span></span>`
    );
  }
  parts.push(`<h4>${esc(xp.title)}</h4>`);
  // the category groups the work for the drawing; it is not printed on the entry
  parts.push(`<p class="xp-meta">${esc(xp.role)} &middot; ${xp.year}</p>`);
  parts.push(`<p class="xp-sum">${xp.summary}</p>`);
  if (xp.links && xp.links.length) {
    parts.push(`<p class="xp-links">${xp.links.map(link).join("")}</p>`);
  }
  if (xp.groups && xp.groups.length) {
    // one disclosure per sub-project, so a reader does not have to open both to find either
    parts.push(`<div class="xp-groups">`);
    for (const g of xp.groups) {
      parts.push(fold(`${xp.id}-${g.id}`, `${paras(g.body)}${plates(g.images)}`, g));
    }
    parts.push(`</div>`);
  } else if (xp.expandable) {
    parts.push(fold(xp.id, body(xp)));
  }
  parts.push(`</div>`, `</article>`);
  return parts.join("\n");
}

function flightPlan(data) {
  const years = [...new Set(data.experiences.map((x) => x.year))].sort((a, b) => b - a);
  return years
    .map((y) => {
      const rows = data.experiences
        .filter((x) => x.year === y)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map(row)
        .join("\n\n");
      const rx = (data.yearOffsets && data.yearOffsets[y]) || "7.5rem";
      return (
        `<section class="tl-group" style="--rx: ${rx}" aria-labelledby="year-${y}">\n` +
        `<h3 class="tl-yr" id="year-${y}">${y}</h3>\n<div class="tl-rows">\n\n${rows}\n\n</div>\n</section>`
      );
    })
    .join("\n\n");
}

/* ---------- case studies ---------- */

function casePage(cs) {
  const live = (cs.sections || []).filter((s) => String(s.body || "").trim());
  const pending = (cs.sections || []).some((s) => s.editorTodo);
  const indexable = cs.status !== "draft";
  const url = `${SITE}/work/${cs.slug}`;
  const sections = live
    .map(
      (s) =>
        `  <section class="cs" id="${esc(s.id)}">\n    <h2>${esc(s.heading)}</h2>\n` +
        paras(s.body).split("\n").map((l) => `    ${l}`).join("\n") +
        `${s.media ? plates(s.media) : ""}\n  </section>`
    )
    .join("\n\n");
  const related = (cs.related || [])
    .map(
      (r) =>
        `      <li><a href="${esc(r.href)}">${esc(r.label)}</a>${r.note ? `<span>${esc(r.note)}</span>` : ""}</li>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(cs.title)} &middot; Zoe Zhou</title>
<meta name="description" content="${esc(cs.description)}">
${indexable ? "" : '<meta name="robots" content="noindex">\n'}<meta name="theme-color" content="#fbfbfa" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#191817" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon.svg">
<link rel="canonical" href="${url}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Zoe Zhou">
<meta property="og:title" content="${esc(cs.title)} &middot; Zoe Zhou">
<meta property="og:description" content="${esc(cs.description)}">
<meta name="twitter:card" content="summary">
<link rel="stylesheet" href="/assets/work.css">
</head>
<body>
<main class="wrap">
  <a class="back" href="/#experience-${esc(cs.experienceId)}">&larr; Flight plan</a>

  <header class="hero">
    <p class="kicker">${esc(cs.kicker)} &middot; ${cs.year}</p>
    <h1>${esc(cs.title)}</h1>
    <p class="sub">${cs.subtitle}</p>
    <dl class="facts">
      <dt>Role</dt><dd>${esc(cs.role)}</dd>
      <dt>When</dt><dd>${esc(cs.timeframe)}</dd>
    </dl>
${cs.links && cs.links.length ? `    <p class="xp-links">${cs.links.map(link).join("")}</p>\n` : ""}${
    cs.hero ? `    ${plate(cs.hero, "x")}\n` : ""
  }  </header>

${sections}

${
  pending
    ? `  <p class="wip">This case study is still being written. What is above is the whole of what is\n  claimed so far; the sections still to come are the detail, not a different story.</p>\n`
    : ""
}${
    related
      ? `  <nav class="related" aria-label="Related work">\n    <h2>Related</h2>\n    <ul>\n${related}\n    </ul>\n  </nav>\n`
      : ""
  }
  <footer class="end">
    <a href="/#flight-plan">Back to the flight plan</a>
    <a href="/#contact">Contact</a>
    <a href="https://www.linkedin.com/in/zoezhouyt912/" rel="noopener noreferrer">LinkedIn</a>
  </footer>
</main>
</body>
</html>
`;
}

/* ---------- run ---------- */

const data = read("content/experiences.json");
const marker = [/<!-- flight-plan:start -->/, /<!-- flight-plan:end -->/];
let index = readFileSync(join(ROOT, "index.html"), "utf8");
const a = index.search(marker[0]);
const b = index.search(marker[1]);
if (a < 0 || b < 0) throw new Error("index.html is missing the flight-plan markers");
index =
  index.slice(0, a) +
  `<!-- flight-plan:start -->\n<!-- Generated by build.mjs from content/experiences.json. Do not edit by hand. -->\n\n` +
  flightPlan(data) +
  `\n\n` +
  index.slice(b);
// the atlas reads the same table, so the page and the drawing cannot disagree
const catJson = JSON.stringify(data.categories || {}, null, 2)
  .split("\n")
  .map((l, i) => (i ? "  " + l : l))
  .join("\n");
index = index.replace(
  /(\/\* categories:start \*\/\n)[\s\S]*?(\n\s*\/\* categories:end \*\/)/,
  (_m, a2, b2) => `${a2}  var CATEGORIES = ${catJson};${b2}`
);
out("index.html", index);

const studies = readdirSync(join(ROOT, "content/case-studies"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => read(join("content/case-studies", f)));
for (const cs of studies) out(`work/${cs.slug}/index.html`, casePage(cs));

const routes = ["/", ...studies.filter((c) => c.status !== "draft").map((c) => `/work/${c.slug}`)];
out(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((r) => `  <url><loc>${SITE}${r === "/" ? "/" : r}</loc></url>`).join("\n") +
    `\n</urlset>\n`
);

console.log("wrote:\n  " + written.join("\n  "));
const todos = studies.flatMap((c) =>
  (c.sections || []).filter((s) => s.editorTodo).map((s) => `  ${c.slug} / ${s.id}: ${s.editorTodo}`)
);
const xpTodos = data.experiences.filter((x) => x.editorTodo).map((x) => `  flight plan / ${x.id}: ${x.editorTodo}`);
console.log(`\n${todos.length + xpTodos.length} open content TODOs:\n` + [...xpTodos, ...todos].join("\n"));
