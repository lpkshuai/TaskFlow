export function formatDate(
  dateStr: string | null | undefined,
  withTime = false,
): string {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = withTime
    ? {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    : { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleString("zh-CN", options);
}

export function truncate(
  text: string | null | undefined,
  maxLength = 80,
): string {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

export function generateId(prefix = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
