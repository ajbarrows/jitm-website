import { defineMiddleware } from 'astro:middleware';

// Open links to other sites, and links to documents such as PDFs, in a new tab.
// Runs on every page as it's built, so it covers components and Markdown alike.
// A link that already sets its own `target` is left alone.

const site = import.meta.env.SITE ? new URL(import.meta.env.SITE).origin : '';
const DOCUMENT = /\.(pdf|docx?|xlsx?|pptx?)(?:[?#]|$)/i;

function opensInNewTab(href: string): boolean {
  if (/^https?:\/\//i.test(href)) return new URL(href).origin !== site || DOCUMENT.test(href);
  return DOCUMENT.test(href);
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;

  const html = (await response.text()).replace(/<a\s[^>]*>/gi, (tag) => {
    const href = tag.match(/\shref="([^"]*)"/i)?.[1];
    if (!href || /\starget=/i.test(tag) || !opensInNewTab(href)) return tag;
    return tag.replace(/>$/, ' target="_blank" rel="noopener noreferrer">');
  });

  return new Response(html, { status: response.status, headers: response.headers });
});
