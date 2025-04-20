import { formatDistanceToNow } from "date-fns";

export default function formatRelativeTime(date: Date | string) {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  return formatDistanceToNow(parsedDate, {
    includeSeconds: true,
    addSuffix: true,
  });
}
