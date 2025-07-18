export function getCurrentSeason(): "SPRING" | "SUMMER" | "AUTUMN" | "WINTER" {
  const today = new Date();
  const m = today.getMonth() + 1;
  if (m >= 3 && m <= 5) return "SPRING";
  if (m >= 6 && m <= 8) return "SUMMER";
  if (m >= 9 && m <= 11) return "AUTUMN";
  return "WINTER";
}