// Prefix site-internal paths with the base path, so links work both at the
// domain root and in a subfolder (e.g. a temporary GitHub Pages copy).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** url('/apply/') -> '/apply/' at the root, '/jitm-website/apply/' in a subfolder. */
export function url(path: string): string {
  return path.startsWith('/') && !path.startsWith('//') ? `${base}${path}` : path;
}

/** Rewrite root-relative href/src attributes in rendered HTML (e.g. from Markdown). */
export function withBase(html: string): string {
  return base ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`) : html;
}
