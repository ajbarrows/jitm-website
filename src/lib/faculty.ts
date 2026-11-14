/** "BDI Enterprises, LLC" -> "BDI Enterprises" */
export const companyName = (legalName: string) => legalName.replace(/,?\s*(LLC|Inc\.?|L\.L\.C\.)$/i, '').trim();

/** ["A", "B", "C"] -> "A, B and C" */
export const listNames = (names: string[]) =>
  names.length <= 1 ? (names[0] ?? '') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
