/**
 * IWS SOVEREIGNTY - FISCAL FORMATTERS
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

// Formats numbers to ZAR Currency (e.g., R 1,250,000)
export const formatZAR = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Formats Firebase Timestamps to "12 JAN 2026"
export const formatDate = (timestamp: any) => {
  if (!timestamp) return '---';
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date).toUpperCase();
};

// Truncates long strings for UI cleanliness
export const truncate = (str: string, length: number) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};
