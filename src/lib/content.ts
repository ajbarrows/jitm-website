import { getEntry, getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';
import { withBase } from './url';

function required<T>(entry: { data: T } | undefined, name: string): T {
  if (!entry) {
    throw new Error(
      `No data for "${name}". Check that content/data/${name}.yaml exists and has the expected fields ` +
        `(the terminal shows which field is wrong). If you just changed src/content.config.ts, restart the dev server.`,
    );
  }
  return entry.data;
}

/** "2027-08-08" -> "Sunday, August 8" */
const longDay = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** Everything in content/data/, in one object. */
export async function getData() {
  const campData = required(await getEntry('camp', 'main'), 'camp');
  if (campData.end < campData.start) throw new Error('camp.yaml: `end` is before `start`.');
  const camp = { ...campData, arrival: longDay(campData.start), departure: longDay(campData.end) };
  const fees = required(await getEntry('fees', 'main'), 'fees');
  const links = required(await getEntry('links', 'main'), 'links');
  const collegeCredit = required(await getEntry('collegeCredit', 'main'), 'collegeCredit');
  const deadlineEntries = await getCollection('deadlines');
  const deadlines = deadlineEntries
    .sort((a, b) => a.data.order - b.data.order)
    .map((d) => ({ id: d.id, date: d.data.date, item: d.data.item }));
  const deadline: Record<string, string> = Object.fromEntries(deadlines.map((d) => [d.id, d.date]));
  return { camp, fees, links, collegeCredit, deadlines, deadline };
}

/** Video audition instructions (content/data/audition.yaml). */
export async function getAudition() {
  return required(await getEntry('audition', 'main'), 'audition');
}

export type SiteData = Awaited<ReturnType<typeof getData>>;

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Missing content/pages/${id}.md`);
  return entry;
}

export async function getFaculty(): Promise<CollectionEntry<'faculty'>[]> {
  const all = await getCollection('faculty', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === 'true';

export type Spot = 'home' | 'apply' | 'faculty' | 'scholarships' | 'credit';

/**
 * One testimonial, looked up by the person's full name as written in
 * testimonials.yaml. Stops the build if the name matches none, or more than one.
 */
export async function getTestimonialByName(name: string) {
  const all = await getCollection('testimonials', ({ data }) => showDrafts || !data.draft);
  const matches = all.filter((t) => t.data.name.trim() === name.trim());
  if (matches.length !== 1) {
    throw new Error(`Expected one testimonial from "${name}" in content/data/testimonials.yaml, found ${matches.length}.`);
  }
  return matches[0].data;
}

/**
 * Testimonials for a spot (or a faculty profile), in file order.
 * Drafts are included in `npm run dev`, or in a build run with SHOW_DRAFTS=true,
 * so placements can be previewed. They are never in a normal build.
 */
export async function getTestimonials(where: { spot?: Spot; faculty?: string }) {
  const all = await getCollection('testimonials', ({ data }) => showDrafts || !data.draft);
  return all
    .sort((a, b) => a.data.order - b.data.order)
    .map((t) => t.data)
    .filter((t) => (where.spot ? t.spots.includes(where.spot) : true) && (where.faculty ? t.faculty === where.faculty : true));
}

/**
 * Replace {{tokens}} in page text with values from content/data/.
 * Examples: {{camp.venue}}, {{camp.year}}, {{deadline.placement}}, {{links.forms.application}}.
 * An unknown token stops the build, so typos are caught before publishing.
 */
export function fill(text: string, data: SiteData): string {
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, path: string) => {
    const value = path.split('.').reduce<unknown>((obj, key) => (obj as Record<string, unknown> | undefined)?.[key], data);
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error(`Unknown token {{${path}}} in page text. Check content/data/ for the right name.`);
    }
    return String(value);
  });
}

/** Render Markdown (with tokens) to HTML. */
export const md = (s: string | undefined, data: SiteData) => withBase(marked.parse(fill(s ?? '', data), { async: false }) as string);
export const mdInline = (s: string | undefined, data: SiteData) => withBase(marked.parseInline(fill(s ?? '', data), { async: false }) as string);

/** True when a link has been filled in, so empty links aren't shown. */
export const isSet = (href?: string) => !!href && href.trim() !== '';

export const telHref = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;
