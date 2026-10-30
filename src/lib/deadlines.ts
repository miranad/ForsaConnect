import type { Opportunity } from '../types';

function validDay(day: string): boolean {
  const parsed = new Date(`${day}T00:00:00Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day;
}

// Date-only deadlines stay visible throughout the stated day in Morocco.
// Ambiguous times and prose remain available for an administrator to review.
export function deadlinePassed(deadline: string, now = new Date()): boolean {
  const value = deadline.trim();
  if (/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?(Z|[+-]\d{2}:\d{2})$/.test(value) && validDay(value.slice(0, 10))) {
    const cutoff = Date.parse(value);
    return Number.isFinite(cutoff) && now.getTime() >= cutoff;
  }
  const match = /^(\d{4}-\d{2}-\d{2})(?:\s*\([^\d]*\))?$/.exec(value);
  if (!match) return false;
  const day = match[1];
  if (!validDay(day)) return false;
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Africa/Casablanca', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (name: string) => parts.find(p => p.type === name)?.value;
  return `${part('year')}-${part('month')}-${part('day')}` > day;
}

export function activeOpportunities(items: Opportunity[], now = new Date()): Opportunity[] {
  return items.filter(item => !deadlinePassed(item.application_deadline, now));
}
