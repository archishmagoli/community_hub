import { format, formatDistanceToNow, parseISO, isPast } from 'date-fns';

export function formatTime(dateString) {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy @ hh:mm a');
  } catch {
    return '';
  }
}

export function formatRemainingTime(dateString) {
  if (!dateString) return '';
  try {
    return isPast(parseISO(dateString))
      ? 'Event has passed'
      : formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return '';
  }
}   