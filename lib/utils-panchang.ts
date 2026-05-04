/**
 * Extracts the core name of a Tithi (e.g., "Shukla Paksha Dashami" -> "Dashami")
 */
export function getShortTithi(tithi: string): string {
  if (!tithi) return "";
  return tithi.split(" ").pop() || "";
}

/**
 * Checks if two dates are the same day (ignoring time)
 */
export function isSameDay(date1: Date | string, date2: Date | string): boolean {
  return new Date(date1).toDateString() === new Date(date2).toDateString();
}

/**
 * Formats a date string for display (e.g., "yyyy-MM-dd" -> "MMMM d, yyyy")
 */
export function formatDate(date: string | Date, formatStr: "short" | "long" = "long"): string {
  const d = new Date(date);
  if (formatStr === "short") {
    return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  }
  return d.toLocaleDateString(undefined, { day: "numeric", month: "long" });
}
