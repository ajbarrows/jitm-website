# Site content

Everything a person edits lives here. The code in `../src/` reads these files, so you don't need to touch it to change text, dates, prices, people or photos. See `../SITE_PLAN.md` for the overall plan.

## What's where

**Facts and figures go in YAML** (`data/`). **Wording goes in Markdown** (`pages/`).

| File | What it holds |
|---|---|
| `data/camp.yaml` | Year, dates, venue, town, audience, eligibility rules, organization names, email, phone, mailing address |
| `data/deadlines.yaml` | Key dates, in order |
| `data/fees.yaml` | Fee table (room types, prices, column labels), what's included and not included |
| `data/links.yaml` | Application and video-upload forms, scholarship form, audition music, donation link, feature video, venue and directions links, social links |
| `data/faculty.yaml` | Faculty and staff, in display order: name, role, instrument, headshot, MP3s, links, bio |
| `data/college-credit.yaml` | Earn College Credit course, provider, contact and registration links |
| `data/testimonials.yaml` | Short camper quotes and where each one appears |
| `pages/*.md` | Page wording. Settings at the top between the `---` lines; body text below |
| `images/` | Logo, photos (`images/photos/`), faculty headshots (`images/faculty/`) |
| `../public/audio/` | Faculty MP3s |
| `../public/files/` | PDFs and other downloads |

## Pulling data into page wording

Page text can include **tokens** in double curly braces, which are replaced with values from `data/` when the site builds. This keeps dates, names and links in one place.

| Token | Becomes |
|---|---|
| `{{camp.year}}`, `{{camp.dates}}`, `{{camp.venue}}`, `{{camp.town}}` | Values from `camp.yaml` |
| `{{camp.contact.email}}` | The contact email |
| `{{deadline.application}}` | The date of the deadline with that `id` in `deadlines.yaml` |
| `{{links.forms.application}}` | A link from `links.yaml` |
| `{{collegeCredit.contact.name}}` | A value from `college-credit.yaml` |

If a token is misspelled, the build stops and names the bad token, so mistakes never reach the live site. In a page's settings block, a value that **starts** with `{{` must be in quotes, e.g. `href: "{{links.forms.application}}"`.

## Common tasks

**New camp year:** update `year` and `dates` in `camp.yaml`, the dates in `deadlines.yaml`, and the prices in `fees.yaml`. Every page picks up the changes.

**Add or update a faculty member:** edit `data/faculty.yaml`. The list order is the display order.
- `id` becomes the page address (`jane-doe` → `/faculty/jane-doe/`). Use lowercase and hyphens.
- `headshot`: put a horizontal photo in `images/faculty/` and point to it, e.g. `headshot: ../images/faculty/jane-doe.jpg`. Until then the card shows initials.
- `tracks`: put MP3s in `../public/audio/` and list them, e.g. `- { title: Blue Bossa, file: /audio/jane-doe-blue-bossa.mp3 }`.
- `draft: true` hides someone without deleting them.

**Add a link that isn't ready yet:** leave it as `""`. The site hides the button until it's filled in.

**Add a testimonial:** add it to `data/testimonials.yaml` with the `quote` (verbatim), full `name` (the site shows first name and last initial, e.g. "Mark M."), an optional `role` for non-campers (shown under the name, e.g. "Guest Artist"), and the `spots` where it should appear:

| Spot | Where it shows |
|---|---|
| `home` | Home page: the first is a large feature quote after "What we value"; the next three appear in "In their words" near the bottom |
| `apply` | Apply page, after the four steps (up to two) |
| `faculty` | Faculty page, under the grid (up to two) |
| `scholarships` | Scholarships page, after "Our commitment" (up to two) |
| `credit` | Earn College Credit page (up to two) |

Add `faculty: <id>` to also show a quote on that person's profile page. Set `draft: true` to hold one back. Drafts show in `npm run dev` with a purple "Draft" label but never on the live site. To check drafts in a full build, run `SHOW_DRAFTS=true npm run build`, but don't publish that build.

## Conventions

- `TODO` marks anything not yet written or supplied. Search for it to see what's left. (TODOs are kept in comments, so they never appear on the site.)
- Keep `description` (the search-engine summary) under about 155 characters.
- In text, `**bold**` and `[links](https://…)` work.
- Every image needs alt text describing what's in it.
- Run `npm run check` after editing. It catches typos in field names, invalid links and missing images before they reach the live site.
