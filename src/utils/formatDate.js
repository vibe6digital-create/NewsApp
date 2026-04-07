import { format, formatDistanceToNow } from 'date-fns';
import { hi } from 'date-fns/locale';

export const formatNewsDate = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return '';
    return format(date, 'dd MMM yyyy, hh:mm a');
  } catch {
    return '';
  }
};

export const formatNewsDateHindi = (dateString) => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return '';
    return format(date, 'dd MMM yyyy, hh:mm a', { locale: hi });
  } catch {
    return '';
  }
};

export const timeAgo = (dateString, lang = 'hi') => {
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
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
