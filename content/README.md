# Site content

Everything a person edits lives here. The code in `../src/` reads these files, so you don't need to touch it to change text, dates, prices, people or photos. See the [project README](../README.md) for the overall plan.

## What's where

**Facts and figures go in YAML** (`data/`). **Wording goes in Markdown** (`pages/`).

| File | What it holds |
|---|---|
| `data/camp.yaml` | Year, dates, venue, town, audience, eligibility rules, organization names, email, phone, mailing address |
| `data/deadlines.yaml` | Key dates, in order |
| `data/fees.yaml` | Fee table (room types, prices, column labels), what's included and not included |
| `data/links.yaml` | Application and video-upload forms, At a Glance PDF, scholarship form, sheet music for the video submission, donation link, feature video, venue and directions links, social links |
| `data/faculty.yaml` | Faculty and staff, in display order: name, role, instrument, headshot, MP3s, links, bio |
| `data/college-credit.yaml` | Earn College Credit course, provider, contact and registration links |
| `data/audition.yaml` | Video submission instructions on the Apply page: general sections, then Horns, Piano/guitar/bass and Drums |
| `data/testimonials.yaml` | Short camper quotes and where each one appears |
| `pages/*.md` | Page wording. Settings at the top between the `---` lines; body text below |
| `images/` | Logo, photos (`images/photos/`), faculty headshots (`images/faculty/`) |
| `../public/audio/` | Faculty MP3s |
| `../public/files/` | PDFs and other downloads, such as the At a Glance PDF. Link to them as `/files/<name>.pdf` |

## Pulling data into page wording

Page text can include **tokens** in double curly braces, which are replaced with values from `data/` when the site builds. This keeps dates, names and links in one place.

| Token | Becomes |
|---|---|
| `{{camp.year}}`, `{{camp.dates}}`, `{{camp.venue}}`, `{{camp.town}}` | Values from `camp.yaml` |
| `{{camp.arrival}}`, `{{camp.departure}}` | First and last day of camp, e.g. "Sunday, August 8" (from `start` and `end` in `camp.yaml`) |
| `{{camp.contact.email}}` | The contact email |
| `{{deadline.application}}` | The date of the deadline with that `id` in `deadlines.yaml` |
| `{{links.forms.application}}` | A link from `links.yaml` |
| `{{collegeCredit.contact.name}}` | A value from `college-credit.yaml` |

If a token is misspelled, the build stops and names the bad token, so mistakes never reach the live site. In a page's settings block, a value that **starts** with `{{` must be in quotes, e.g. `href: "{{links.forms.application}}"`.

## Common tasks

**New camp year:** update `year`, `dates`, `start` and `end` in `camp.yaml`, the dates in `deadlines.yaml`, and the prices in `fees.yaml`. Every page picks up the changes.

**Add or update a faculty member:** edit `data/faculty.yaml`. The list order is the display order.
- `id` becomes the page address (`jane-doe` → `/faculty/jane-doe/`). Use lowercase and hyphens.
- `headshot`: put a horizontal photo in `images/faculty/` and point to it, e.g. `headshot: ../images/faculty/jane-doe.jpg`. Until then the card shows initials.
- `tracks`: put MP3s in `../public/audio/` and list them, e.g. `- { title: Blue Bossa, file: /audio/jane-doe-blue-bossa.mp3 }`.
- `administrator: true` lists someone under "Camp administration" at the top of the Faculty page (their other role still shows).
- `owner: true` adds a "Co-owner" tag and names them as owners of the company in `camp.yaml` (`organization.legalName`).
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

## Publishing a change

Every change goes through a branch and a pull request (PR), so colleagues can see it on a real preview site before it goes live. Nothing reaches www.jazzinthemountains.com until it's merged into `main`.

1. **Make a branch.** Give it a short, lowercase, hyphenated name that says what it's for, e.g. `fees-2027` or `new-faculty-bio`. The name becomes part of the preview address.
2. **Make your edits** and run `npm run check`. Commit and push the branch.
3. **Open a PR** on GitHub into `main`. In a minute or two, Cloudflare adds a check to the PR with a link to the preview, e.g. `https://fees-2027.<project>.pages.dev`. Every later push to the branch updates that preview.
4. **Share the preview link** with colleagues and collect feedback on the PR. Previews are hidden from search engines and don't show `draft: true` items (unless previews are set to show drafts).
5. **Merge the PR.** Cloudflare rebuilds `main` and the change is live within a few minutes. Delete the branch afterwards.

From the command line:

```sh
git switch main && git pull          # start from the latest live version
git switch -c fees-2027              # make a branch
# …edit files…
npm run check                        # catch mistakes before anyone sees them
git add -A && git commit -m "Update fees for 2027"
git push -u origin fees-2027         # then open the PR on GitHub
```

**No command line?** Small text edits can be made on github.com: open the file, click the pencil icon, make the change, then choose **Create a new branch for this commit and start a pull request**. The preview link appears on the PR the same way. (You can't run `npm run check` this way, but Cloudflare's build fails, and the PR shows a red ✗, if a required field is missing, a link isn't a valid web address, an image is missing or a `{{token}}` is misspelled. A misspelled *optional* field is quietly ignored, so check the preview.)

If the build fails, click **Details** on the PR's Cloudflare check to see the error. It usually names the file and field to fix.

> **Until the site moves to Cloudflare:** previews don't happen automatically. Run `npm run deploy:pages` to publish your working copy to the temporary GitHub Pages preview (https://ajbarrows.github.io/jitm-website/). It shows one version at a time, not one per branch.
