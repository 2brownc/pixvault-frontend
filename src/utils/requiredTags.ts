export function requiredTags(strings: string[], limit: number): string[] {
  // Filter out strings containing numbers using a regular expression:
  const filteredStrings = strings.filter(str => !/\d/.test(str))

  // Remove duplicates using a Set:
  const uniqueStrings = [...new Set(filteredStrings)]

  // only return as per limit
  return uniqueStrings.slice(0, limit)
}
