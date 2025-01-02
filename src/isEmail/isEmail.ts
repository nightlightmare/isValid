/**
 * Validates if the given string is a valid email.
 * @param email - The string to validate.
 * @returns True if the string is a valid email, otherwise false.
 * @see https://github.com/nightlightmare/isValid/blob/main/src/isEmail
 */

export function isEmail(email: string): boolean {
  const emailRegex = /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/;
  return emailRegex.test(email);
}
