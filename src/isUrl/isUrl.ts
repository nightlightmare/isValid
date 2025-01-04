/**
 * Validates if the given string is a valid URL.
 * @param url - The string to validate.
 * @returns True if the string is a valid URL, otherwise false.
 * @see https://github.com/nightlightmare/isValid/blob/main/src/isUrl
 */
export function isUrl(url: string): boolean {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  return urlRegex.test(url);
}
