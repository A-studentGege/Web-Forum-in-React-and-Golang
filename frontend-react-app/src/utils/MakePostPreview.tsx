export function MakePostPreview(
  content: string,
  maxWords: number = 50
): string {
  if (!content) return "";

  // Normalize whitespace (spaces, newlines, tabs)
  const words = content.trim().split(/\s+/);

  if (words.length <= maxWords) {
    return content.trim();
  }

  return words.slice(0, maxWords).join(" ") + "...";
}
