# Jazz in the Mountains: Site Plan

Originally condensed from `external/Jazz In The Mountains Site Plan.pdf` (page references p.N point to it). That plan was written by Studio J Creative, who are not involved in this build. The site is now built with [Astro](https://astro.build) as a static site instead of Squarespace.

**Goal:** A modern, jazz-forward, responsive site that attracts more of the *right* applicants and is easy to keep up to date.

**Audience:** Adult (18+) intermediate and advanced instrumentalists, especially trombone, trumpet and rhythm players. No vocalists, beginners or kids. Clarinet and flute players must also play sax.

## 1. Build approach

| Piece | Choice |
|---|---|
| Framework | Astro 7, static output. Pages ship as plain HTML and CSS, with **no JavaScript and no iframes** |
| Content | Facts and figures in YAML (`content/data/`); page wording in Markdown (`content/pages/`), which can pull in data with `{{tokens}}`. All validated by schemas in `src/content.config.ts` |
| Fonts | Fraunces (headings) and Inter (body), self-hosted via Fontsource; no Google Fonts requests |
| Images | Stored in `content/images/`; Astro resizes them and converts them to WebP at build time |
| Hosting | Netlify or Cloudflare Pages (free tier), deploying automatically from GitHub |
| Redirects | `public/_redirects` (works on both hosts) |
| Sitemap | Generated at build by `@astrojs/sitemap` |

**Built-in replacements for embeds:**
- Faculty MP3s: the browser's native `<audio>` player
- YouTube video: a thumbnail that links to YouTube
- Map: a "Get directions" button that opens Google Maps
- Accordions: native `<details>` elements
- Mobile navigation: wraps under the logo; no menu script

**Editing:** For now, the site owner edits the files in `content/` directly and pushes to GitHub, which rebuilds the site. See `content/README.md`.

**Option for a non-technical administrator later:** Add a Git-based CMS such as Keystatic or Sveltia CMS. It gives an editing screen at `/admin` that writes to the same `content/` files, so no page code changes. Editors would need a free GitHub account. Because all editable content already lives in `content/` with schemas, this is a configuration task, not a rebuild.

## 2. Site map

Navigation has no dropdowns: **Faculty · Scholarships · Contact · Apply** (Apply is a button)

| Page | Source | Sections |
|---|---|---|
| **Home** `/` | `content/pages/home.md` | Hero photo with headline, dates and buttons; at-a-glance strip; about; photo mosaic; values; feature video; who should apply; testimonials (shown once added) |
| **Apply** `/apply/` | `content/pages/apply.md` | Eligibility; key dates; four application steps; fee table; included and not included; video audition accordion; questions banner |
| **Faculty** `/faculty/` | `content/pages/faculty.md`, `content/data/faculty.yaml` | Grid of horizontal headshots (initials shown until a photo is added), each linking to a detail page |
| **Faculty detail** `/faculty/<id>/` | `content/data/faculty.yaml` | Photo, role, instrument, bio, audio tracks, links |
| **Scholarships** `/scholarships/` | `content/pages/scholarships.md` | Mission text; scholarship application; donate to the fund through Stripe |
| **Contact** `/contact/` | `content/pages/contact.md` | Email, phone and mail cards; venue photo with directions and hotel buttons. **No contact form** |
| **Earn College Credit** `/earn-college-credit/` | `content/pages/earn-college-credit.md` | Jazz Immersion info and registration links; linked from the footer only |
| **404** | `src/pages/404.astro` | "Wrong note" page with links home and to Apply |

Every data field lives once in `content/data/`: `camp.yaml` (dates, venue, contact, eligibility), `deadlines.yaml`, `fees.yaml`, `links.yaml` (forms, audition music, donation, video, social), `faculty.yaml`, `college-credit.yaml` and `testimonials.yaml`. Pages read from these, so nothing is typed twice. Empty links (such as the Stripe link before it exists) are hidden automatically, with a "coming soon" note where it matters.

**Footer (shared):** camp dates and venue, Apply Now, Support Our Mission (once the Stripe link exists), contact info, page links including Earn College Credit, YouTube, Facebook, the Killington Resort link, and a Google review link once the Business Profile exists.

**Design:** Editorial, photo-led look modeled on modern Squarespace sites and the Studio J portfolio. Every page opens with a full-width photo under a transparent header. Sections use centered small-caps labels with a short teal rule, generous white space, thin dividing lines instead of boxes, and square uppercase buttons. A "Ready to play?" photo band sits above the footer on most pages. Type: Fraunces (light weight, italic accents) for headings and Inter for text. Palette from the logo: mountain teal `#1dbf86`, ink `#16131d`, warm off-white `#f6f4ef`. The logo was given a transparent background (`content/images/logo.png`) so it sits on photos.

## 3. Decisions made

- **Platform:** Astro instead of Squarespace, for full design control, no monthly platform fee and no JavaScript or iframes.
- **Data in YAML:** All data fields (dates, location, faculty, prices, links) are kept in YAML files, separate from page wording.
- **Photo banners:** Full-width photo banners were chosen over a drawn-mountain alternative that was previewed.
- **Donations:** No separate Donate page. Donations go through a Stripe button on Scholarships and in the footer.
- **Resources:** No Resources page and no password-protected area. Camper materials stay in Google Drive.
- **Studio J Creative:** No role. The team handles design, copy, Google setup and the domain.
- **Logo:** Keep the current logo for now. It's hard to read at small sizes, so check it in the header on phones.
- **Email:** Use admin@jazzinthemountains.com everywhere the site shows an address, replacing jazzmountains@gmail.com.

## 4. Content needed from the team

Search the `content/` folder for `TODO` to see every gap.

- [ ] **Confirmed 2027 dates and costs.** The draft uses 2026 fees and deadlines. The live site conflicts: the homepage says Aug 8–13, 2027, while Apply says Aug 9–14 and lists 2026 deadlines.
- [ ] Logo graphic at a larger size, ideally with a transparent background (current one is a 709 px JPEG)
- [ ] High-resolution photos. The draft uses the 2023–2024 gallery photos, which are only about 1100 px wide and look soft full-screen.
- [x] Faculty headshots for 9 people (from `staff/`). Still needed: Daniel Ian Smith and Peter BarenBregge; a larger photo of Austin McMahon (current one is 200 px)
- [ ] Ray Vega's role (added as a draft from `staff/ray-vega/`)
- [ ] MP3s, a bio for Jared Johnson, and bio approval from each faculty member
- [ ] Confirm the 2027 guest artist and roster
- [ ] Homepage video: confirm the [current pick](https://youtu.be/3iuV-SafdaE) or supply a re-edit
- [ ] Scholarship application Google Form (not yet created) and its deadline
- [ ] Stripe donation link (not yet created; recurring gifts need a fixed amount)
- [x] Testimonials (in `content/data/testimonials.yaml`). Still needed: Andy T.'s last name (probably Andy Tompkins), and ideally a scholarship recipient's quote
- [ ] Working Jazz Immersion links for 2027, and whether to list Glendon's personal email
- [ ] Review all draft copy

## 5. Build sequence

1. ~~**Scaffold:** Astro project, content schemas, layout, design system and all pages.~~ Done (draft)
2. **Version control:** Create a GitHub repository and push the project. A temporary preview publishes to GitHub Pages (https://ajbarrows.github.io/jitm-website/) via `.github/workflows/github-pages.yml`; it is hidden from search engines. Delete that workflow after the move to Cloudflare.
3. **Content:** Fill the `TODO`s, add photos, headshots and MP3s, and review copy.
4. **Host:** Connect the repository to Netlify or Cloudflare Pages; every push to `main` deploys. Check the preview URL.
5. **Test:** Mobile layouts, all links and forms, a live Stripe donation, page titles and descriptions, image alt text, and a Lighthouse audit.
6. **Launch:** Point the GoDaddy domain at the host, keep the email DNS records for admin@jazzinthemountains.com intact, and confirm HTTPS. Test each old URL in section 6.
7. **After launch:** Set up Search Console and analytics (with DNS on Cloudflare, its built-in traffic analytics read server logs and need no script on the page; Cloudflare Web Analytics, by contrast, adds a small script), submit `sitemap-index.xml`, and start the Google Business Profile (on-site video verification required). Cancel Weebly only after the new site is verified.
8. **Optional:** Add a Git-based CMS for a non-technical administrator (see section 1).

**Timing:** Launch by January 2027, ahead of an application deadline likely to fall around March 1 (last cycle's date; confirm for 2027).

## 6. Redirects

Defined in `public/_redirects`:

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

## 7. Working on the site

```
npm install        # once
npm run dev        # live preview at http://localhost:4321
npm run build      # production build into dist/
npm run check      # type and schema check
```

## 8. Dropped from the Studio J plan

- JCloud Pro CMS, AWS hosting, Cloudflare and the $100/year SSL certificate (the host includes HTTPS)
- Resources page, including its blog, categories and password
- New logo and the social media rebrand that went with it
- "Previous Years" and About as separate pages
- Contact form (spam risk)
- Separate Donate page
- Elfsight MP3 player, embedded Google Map, and all JavaScript and iframes

**Recurring costs:** Domain, email hosting, Stripe fees, and any Adobe Stock images. Hosting is free at this traffic level.
