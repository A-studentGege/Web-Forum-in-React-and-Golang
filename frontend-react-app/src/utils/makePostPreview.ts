/**
 * Shorten the post content to make a preview 
 * 
 * @param content - the post's full body content
 * @param maxWords - max word count to show
 * @returns shortened content ending with ... based on the max word count specified
 */
export function makePostPreview(
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
