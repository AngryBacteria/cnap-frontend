export function capitalizeFirstLetter(
  val: string,
  lower = false,
  trim = false,
): string {
  if (!val) {
    return '';
  }
  if (lower) {
    val = val.toLowerCase();
  }
  if (trim) {
    val = val.trim();
  }
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function truncateText(value: string, maxLength: number) {
  const truncated = value.slice(0, maxLength);
  // Search for last .
  const lastDot = truncated.lastIndexOf('.');
  if (lastDot !== -1) {
    return `${truncated.slice(0, lastDot + 1)}...`;
  }
  // Search for last whitespace if no . is found
  const lastSpace = truncated.lastIndexOf(' ');
  if (lastSpace !== -1) {
    return `${truncated.slice(0, lastSpace)}...`;
  }
  // If no . or whitespace is found, return the truncated string
  return `${truncated}...`;
}
