# Jazz in the Mountains website

The website for Jazz in the Mountains, a jazz camp for adult instrumentalists. It's a static site built with [Astro](https://astro.build), replacing the old Weebly site.

**Goal:** A modern, jazz-forward, responsive site that attracts more of the *right* applicants and is easy to keep up to date.

**Audience:** Adult (18+) intermediate and advanced instrumentalists, especially trombone, trumpet and rhythm players. No vocalists, beginners or kids. Clarinet and flute players must also play sax.

**Preview:** https://ajbarrows.github.io/jitm-website/ (temporary; hidden from search engines)

## Contents

- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Tech stack](#tech-stack)
- [Site map](#site-map)
- [Design](#design)
- [Deployment](#deployment)
- [Redirects](#redirects)
- [Status and roadmap](#status-and-roadmap)
- [Decisions](#decisions)
- [Background](#background)

## Getting started

Requires Node.js and npm.

```sh
npm install        # once
npm run dev        # live preview at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run check      # type and schema check
```

## Project structure

```
content/            Everything a person edits (see content/README.md)
  data/             Facts and figures in YAML
  pages/            Page wording in Markdown
  images/           Photos, headshots and logo
src/
  content.config.ts Schemas that validate everything in content/
  pages/            One .astro file per route
  components/       Shared UI pieces (header, footer, cards, etc.)
  layouts/          Base page layout
  lib/              Content loading and URL helpers
  styles/           Global CSS
public/
  _redirects        Old-site URL redirects
  audio/, files/    MP3s and downloadable files, served as-is
scripts/            Deployment helpers
```

`staff/` and `external/` hold source material that isn't part of the site and are git-ignored.

## Editing content

All editable content lives in `content/`, and `content/README.md` explains how to change it and publish a change. For now, the site owner edits those files directly and pushes to GitHub, which rebuilds the site.

- **Data** lives once in `content/data/`: `camp.yaml` (dates, venue, contact, eligibility), `deadlines.yaml`, `fees.yaml`, `links.yaml` (forms, audition music, donation, video, social), `faculty.yaml`, `college-credit.yaml` and `testimonials.yaml`. Pages read from these, so nothing is typed twice.
- **Page wording** lives in `content/pages/` as Markdown, which can pull in data with `{{tokens}}`.
- **Empty links** (such as the Stripe link before it exists) are hidden automatically, with a "coming soon" note where it matters.
- Run `npm run check` after editing to catch schema errors.

**Option for a non-technical administrator later:** Add a Git-based CMS such as Keystatic or Sveltia CMS. It gives an editing screen at `/admin` that writes to the same `content/` files, so no page code changes. Editors would need a free GitHub account. Because all editable content already lives in `content/` with schemas, this is a configuration task, not a rebuild.

## Tech stack

| Piece | Choice |
|---|---|
| Framework | Astro 7, static output. Pages ship as plain HTML and CSS, with **no JavaScript and no iframes** |
| Content | YAML data and Markdown pages in `content/`, validated by schemas in `src/content.config.ts` |
| Fonts | Fraunces (headings) and Inter (body), self-hosted via Fontsource; no Google Fonts requests |
| Images | Stored in `content/images/`; Astro resizes them and converts them to WebP at build time |
| Hosting | Cloudflare Pages (free tier), deploying automatically from GitHub |
| Redirects | `public/_redirects` (works on both hosts) |
| Sitemap | Generated at build by `@astrojs/sitemap` |

**Built-in replacements for embeds:**
- Faculty MP3s: the browser's native `<audio>` player
- YouTube video: a thumbnail that links to YouTube
- Map: a "Get directions" button that opens Google Maps
- Accordions: native `<details>` elements
- Mobile navigation: wraps under the logo; no menu script

## Site map

Navigation has no dropdowns: **Experience · Faculty · College credit · FAQ · Contact · Apply** (Apply is a button). Scholarships is linked from the Apply page, the home page and the footer.

| Page | Source | Sections |
|---|---|---|
| **Home** `/` | `content/pages/home.md` | Hero photo with headline, dates and buttons; at-a-glance strip; about; photo mosaic; values; feature video; who should apply; testimonials (shown once added) |
| **Apply** `/apply/` | `content/pages/apply.md` | Eligibility; key dates; four application steps; fee table; included and not included; video audition accordion; questions banner |
| **The Experience** `/experience/` | `content/pages/experience.md` | Intro; setting and venue (photo bands); your week and a typical day; what you'll play in (numbered grid); meals and after hours; partners and spouses (`#partners`); what campers take home, with Apply and FAQ links |
| **Faculty** `/faculty/` | `content/pages/faculty.md`, `content/data/faculty.yaml` | Grid of horizontal headshots (initials shown until a photo is added), each linking to a detail page |
| **Faculty detail** `/faculty/<id>/` | `content/data/faculty.yaml` | Photo, role, instrument, bio, audio tracks, links |
| **Scholarships** `/scholarships/` | `content/pages/scholarships.md` | Mission text; scholarship application; donate to the fund through Stripe |
| **Contact** `/contact/` | `content/pages/contact.md` | Email, phone and mail cards; venue photo with directions and hotel buttons. **No contact form** |
| **Earn College Credit** `/earn-college-credit/` | `content/pages/earn-college-credit.md` | Jazz Immersion info and registration links |
| **FAQ** `/faq/` | `content/pages/faq.md` | Questions grouped into sections, as accordions; an answer can show a camper quote from `testimonials.yaml` |
| **404** | `src/pages/404.astro` | "Wrong note" page with links home and to Apply |

**Footer (shared):** camp dates and venue, Apply Now, Support Our Mission (once the Stripe link exists), contact info, page links including Earn College Credit, YouTube, Facebook, the Killington Resort link, and a Google review link once the Business Profile exists.

## Design

- Every page opens with a full-width photo under a transparent header.
- Sections use centered small-caps labels with a short teal rule, generous white space, thin dividing lines instead of boxes, and square uppercase buttons.
- A "Ready to play?" photo band sits above the footer on most pages.
- **Type:** Fraunces (light weight, italic accents) for headings and Inter for text.
- **Palette** (from the logo): mountain teal `#1dbf86`, ink `#16131d`, warm off-white `#f6f4ef`.
- **Logo:** given a transparent background (`content/images/logo.png`) so it sits on photos.

## Deployment

**Temporary preview:** `npm run deploy:pages` builds locally and pushes to the `gh-pages` branch, publishing to https://ajbarrows.github.io/jitm-website/. Delete `scripts/deploy-gh-pages.sh` after the move to Cloudflare.

**Production:** Cloudflare Pages, connected to this GitHub repository. Every push to `main` deploys, and every other branch gets its own preview at `<branch>.<project>.pages.dev`.

```
branch ──push──▶ Cloudflare builds ──▶ <branch>.<project>.pages.dev   (preview)
   │
   └──PR──▶ review, more pushes update the preview
              │
              └──merge into main ──▶ Cloudflare builds ──▶ <project>.pages.dev
                                                          └─▶ www.jazzinthemountains.com
                                                              (once the domain is connected)
```

- **Cloudflare reacts to pushes, not PRs.** Any push to any branch builds a preview. The PR is where GitHub shows it: a check with the preview link, or a red ✗ if the build failed.
- **Merging into `main` updates the live site** within a minute or two.
- **Pushing straight to `main` also deploys immediately.** Branch and PR is a convention for getting a preview first. GitHub's branch protection rules can enforce it if needed.

Step-by-step instructions for editors are in [content/README.md](content/README.md#publishing-a-change).

Cloudflare Pages build settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variables | None needed. Optionally, `SHOW_DRAFTS=true` for the **Preview** environment only |

The Node version comes from [`.node-version`](.node-version). [`public/_headers`](public/_headers) keeps the `*.pages.dev` address out of search engines.

> **If a Cloudflare build fails at "Installing project dependencies" with `Missing: … from lock file`:** Cloudflare installs with `npm ci`, which is stricter than the npm on a Mac about optional packages for other platforms (here, `@rolldown/binding-wasm32-wasi` and the `@emnapi/*` versions it needs). Running `npm install` locally can quietly drop those lock-file entries again. Either:
>
> - **Repair the lock file** before committing: `npx npm@10 install --package-lock-only`, then commit `package-lock.json`. Check with `npx npm@10 ci`.
> - **Or stop Cloudflare from using `npm ci`:** in the Pages project, add the environment variable `SKIP_DEPENDENCY_INSTALL=true` and change the build command to `npm install && npm run build`. The trade-off is that builds no longer use exactly the versions in the lock file.

**Launch checklist:**
1. Point the GoDaddy domain at the host, keep the email DNS records for admin@jazzinthemountains.com intact, and confirm HTTPS.
2. Test each old URL listed under [Redirects](#redirects).
3. Set up Search Console and analytics. With DNS on Cloudflare, its built-in traffic analytics read server logs and need no script on the page; Cloudflare Web Analytics, by contrast, adds a small script.
4. Submit `sitemap-index.xml`.
5. Start the Google Business Profile (on-site video verification required).
6. Cancel Weebly only after the new site is verified.

**Recurring costs:** Domain, email hosting, Stripe fees, and any Adobe Stock images. Hosting is free at this traffic level.

## Redirects

Old Weebly URLs are redirected in `public/_redirects`:

```
/about.html               -> /                      301
/staff.html               -> /faculty/              301
/previous-years.html      -> /                      301
/jazz-immersion.html      -> /earn-college-credit/  301
/scholarship.html         -> /scholarships/         301
/apply.html               -> /apply/                301
/videorequirements.html   -> /apply/#audition       301
/resources.html           -> /                      301
/contact.html             -> /contact/              301
/store/*                  -> /scholarships/         301
```

## Status and roadmap

**Timing:** Launch by January 2027, ahead of an application deadline likely to fall around March 1 (last cycle's date; confirm for 2027).

### Build sequence

1. ~~**Scaffold:** Astro project, content schemas, layout, design system and all pages.~~ Done (draft)
2. ~~**Version control:** GitHub repository with a temporary GitHub Pages preview (see [Deployment](#deployment)).~~ Done
3. ~~**Content:** Fill the `TODO`s, add photos, headshots and MP3s, and review copy.~~ Done
4. ~~**Host:** Connect to Cloudflare Pages and check the preview URL.~~ Done
5. **Test:** Mobile layouts, all links and forms, a live Stripe donation, page titles and descriptions, image alt text, and a Lighthouse audit.
6. **Launch:** Follow the [launch checklist](#deployment).
7. **Optional:** Add a Git-based CMS for a non-technical administrator (see [Editing content](#editing-content)).

### ToDo

#### large tasks

- [ ] set up production deployment
- [ ] Stripe donation link (not yet created; recurring gifts need a fixed amount)

#### medium tasks
- [ ] make "past years" page

#### small tasks




- [x] increase size of Jazz in the Mountains logo on home page
- [x] substitute the phrase "video submission" for "audition" or "video audition" throughout
- [x] make links to external pages/documents open in new tabs
- [x] bury scholarships page -- remove from navigation header and instead link under the prices on the apply page with the text "We don’t want cost to be what keeps a good musician away. If it’s a barrier for you, we may be able to help."
- [x] add "at a glance" document to home page and apply page
- [x] change Matt P's quote
- [x] change price order to display least to most
- [x] replace "Adults 18 and over" with "21 and over"
- [x] change description of 1BR suite




- [x] replace "what we value" grid with new sugestions
  - [x] move "what we value" grid from home page to faculty page
  - [x] update blurb
  - [x] update grid
  - [x] add "who's it for"
- [x] add FAQ page
- [x] add "the experience" page
