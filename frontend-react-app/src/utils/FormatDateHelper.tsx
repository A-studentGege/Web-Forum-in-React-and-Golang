export function FormatDateHelper(date: Date): string {
  const hours24 = date.getHours();
  const minutes = date.getMinutes();

  const isAM = hours24 < 12;
  const hours12 = hours24 % 12 || 12;

  const hh = hours12.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const period = isAM ? "am" : "pm";

  const day = date.getDate().toString().padStart(2, "0");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  const year = date.getFullYear();

  return `${hh}.${mm} ${period}, ${day} ${month} ${year}`;
}
