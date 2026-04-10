import { format, formatDistanceToNow } from 'date-fns';
import { hi } from 'date-fns/locale';

/** Ensure SQLite UTC dates (no timezone suffix) are parsed correctly */
const parseDate = (dateString) => {
  if (typeof dateString !== 'string') return dateString;
  // SQLite returns "2026-04-09 09:30:00" (UTC but no Z) — append Z so JS parses as UTC
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateString)) {
    return new Date(dateString.replace(' ', 'T') + 'Z');
  }
  return new Date(dateString);
};

export const formatNewsDate = (dateString) => {
  try {
    const date = parseDate(dateString);
    if (isNaN(date.getTime())) return '';
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch {
    return '';
  }
};

export const formatNewsDateHindi = (dateString) => {
  try {
    const date = parseDate(dateString);
    if (isNaN(date.getTime())) return '';
    return format(date, 'dd MMM yyyy, hh:mm a', { locale: hi });
  } catch {
    return '';
  }
};

export const timeAgo = (dateString, lang = 'hi') => {
  try {
    const date = parseDate(dateString);
    if (isNaN(date.getTime())) return '';
    return formatDistanceToNow(date, { addSuffix: true, locale: lang === 'en' ? undefined : hi });
  } catch {
    return '';
  }
};

export const formatDateISO = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toISOString();
  } catch {
    return new Date().toISOString();
  }
};
