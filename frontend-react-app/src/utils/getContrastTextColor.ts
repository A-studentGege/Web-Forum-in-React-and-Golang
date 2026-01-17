/**
 * Get the contrast color of an input color in hex code string
 * 
 * @param bgColor - hex code string of the background color
 * @returns hex code of the contrast text color 
 */
export function getContrastTextColor(bgColor: string): string {
  // Remove # from color hex code string
  const color = bgColor.replace("#", "");

  // Convert to RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Perceived brightness (YIQ) formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#000" : "#fff";
}
