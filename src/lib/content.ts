import { getEntry, getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';

function required<T>(entry: { data: T } | undefined, name: string): T {
  if (!entry) throw new Error(`Missing data file for "${name}" in content/data/`);
  return entry.data;
}

/** Everything in content/data/, in one object. */
export async function getData() {
  const camp = required(await getEntry('camp', 'main'), 'camp');
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
export const md = (s: string | undefined, data: SiteData) => marked.parse(fill(s ?? '', data), { async: false }) as string;
export const mdInline = (s: string | undefined, data: SiteData) => marked.parseInline(fill(s ?? '', data), { async: false }) as string;

/** True when a link has been filled in, so empty links aren't shown. */
export const isSet = (href?: string) => !!href && href.trim() !== '';

export const telHref = (phone: string) => `tel:${phone.replace(/\D/g, '')}`;
