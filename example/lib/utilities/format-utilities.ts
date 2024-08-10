import { DateTime } from "luxon";

export function formatDate(date: string) {
  const datetime = DateTime.fromISO(date);
  if (datetime.year == DateTime.now().year) {
    return datetime.toFormat("LLL d");
  }
  return datetime.toFormat("LLL d, yyyy");
}

export function formatDateDiff(date: string) {
  return DateTime.fromISO(date).toRelative(DateTime.now());
}

export function formatNumberCompact(n: number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(n);
}
