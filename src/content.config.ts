import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

// Editable content lives in /content:
//   content/data/*.yaml  facts and figures (dates, venue, fees, links, faculty…)
//   content/pages/*.md   page wording, with optional {{tokens}} that pull in data
// A Git-based CMS can be pointed at these files later without touching /src.

const link = z.object({ label: z.string(), href: z.string() });

/** Load a YAML file that holds one object as a single entry with id "main". */
const single = (path: string) => file(path, { parser: (text) => ({ main: parse(text) }) });
/** Load a YAML list; each item needs an `id`. List position becomes `order`. */
const list = (path: string) =>
  file(path, { parser: (text) => (parse(text) as Record<string, unknown>[]).map((item, order) => ({ ...item, order })) });

const camp = defineCollection({
  loader: single('./content/data/camp.yaml'),
  schema: z.object({
    year: z.number(),
    dates: z.string(),
    venue: z.string(),
    town: z.string(),
    audience: z.string(),
    eligibility: z.array(z.string()),
    organization: z.object({ name: z.string(), legalName: z.string() }),
    contact: z.object({ email: z.email(), phone: z.string(), mailingAddress: z.array(z.string()) }),
  }),
});

const deadlines = defineCollection({
  loader: list('./content/data/deadlines.yaml'),
  schema: z.object({ date: z.string(), item: z.string(), order: z.number() }),
});

const fees = defineCollection({
  loader: single('./content/data/fees.yaml'),
  schema: z.object({
    columns: z.array(z.object({ label: z.string(), note: z.string() })),
    rooms: z.array(z.object({ room: z.string(), prices: z.array(z.number()) })),
    included: z.string(),
    notIncluded: z.string(),
  }),
});

const optionalUrl = z.union([z.literal(''), z.url()]).default('');

const links = defineCollection({
  loader: single('./content/data/links.yaml'),
  schema: z.object({
    forms: z.object({ application: optionalUrl, videoUpload: optionalUrl, scholarship: optionalUrl }),
    auditionMusic: optionalUrl,
    donate: optionalUrl,
    featureVideo: z.string(),
    venue: z.url(),
    directions: z.url(),
    social: z.object({ youtube: z.url(), facebook: z.url(), googleReviews: optionalUrl }),
  }),
});

const collegeCredit = defineCollection({
  loader: single('./content/data/college-credit.yaml'),
  schema: z.object({
    provider: z.string(),
    course: z.string(),
    contact: z.object({ name: z.string(), email: z.email() }),
    links: z.array(z.object({ label: z.string(), href: optionalUrl })),
  }),
});

const testimonials = defineCollection({
  loader: file('./content/data/testimonials.yaml', {
    // Items don't need their own id; use their position in the list.
    parser: (text) => (parse(text) as Record<string, unknown>[]).map((item, order) => ({ id: `t${order}`, ...item, order })),
  }),
  schema: z.object({
    quote: z.string().max(240),
    name: z.string(),
    role: z.string().optional(),
    spots: z.array(z.enum(['home', 'apply', 'faculty', 'scholarships', 'credit'])).default([]),
    faculty: z.string().optional(),
    draft: z.boolean().default(false),
    order: z.number(),
  }),
});

const faculty = defineCollection({
  loader: list('./content/data/faculty.yaml'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      instrument: z.string().default(''),
      headshot: image().nullish(),
      headshotAlt: z.string(),
      tracks: z.array(z.object({ title: z.string(), file: z.string() })).default([]),
      links: z.array(link).default([]),
      bio: z.string().default(''),
      draft: z.boolean().default(false),
      order: z.number(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(170),
      // Photo behind the page title (every page except Home)
      banner: image().optional(),
      bannerAlt: z.string().optional(),
      // Home
      hero: z.object({ eyebrow: z.string(), headline: z.string(), image: image(), imageAlt: z.string() }).optional(),
      aboutHeading: z.string().optional(),
      values: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
      video: z.object({ thumbnail: image(), caption: z.string() }).optional(),
      whoHeading: z.string().optional(),
      who: z.string().optional(),
      gallery: z.array(z.object({ image: image(), alt: z.string() })).optional(),
      // Apply
      intro: z.string().optional(),
      steps: z.array(z.object({
        title: z.string(),
        deadline: z.string().optional(),
        body: z.string(),
        button: link.optional(),
      })).optional(),
      audition: z.array(z.object({ title: z.string(), body: z.string(), image: image().optional(), imageAlt: z.string().optional() })).optional(),
      // Contact
      venuePhoto: image().optional(),
      venuePhotoAlt: z.string().optional(),
      // Scholarships
      headline: z.string().optional(),
      apply: z.string().optional(),
      donate: z.string().optional(),
    }),
});

export const collections = { camp, deadlines, fees, links, collegeCredit, faculty, testimonials, pages };
