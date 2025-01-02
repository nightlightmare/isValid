/**
 * Validates if the given string is a valid email.
 * @param email - The string to validate.
 * @returns True if the string is a valid email, otherwise false.
 * @see https://github.com/nightlightmare/isValid/src/isEmail
 */

export function isEmail(email: string): boolean {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}
