/**
 * Validates if the given string is a valid email with additional options.
 * @param email - The string to validate.
 * @param options - Additional validation options.
 * @param options.blacklist - A list of blacklisted domains to reject.
 * @param options.whitelist - A list of whitelisted domains to allow.
 * @param options.maxLength - Maximum allowed length for the email.
 * @returns True if the string is a valid email, otherwise false.
 * @see https://github.com/nightlightmare/isValid/blob/main/src/isEmail
 */

export function isEmail(
  email: string,
  options?: {
    blacklist?: string[];
    whitelist?: string[];
    maxLength?: number;
  }
): boolean {
  const { blacklist, whitelist, maxLength } = options || {};

  // Check length
  if (maxLength && email.length >= maxLength) {
    return false;
  }

  // Split email into local and domain parts
  const [local, domain] = email.split('@');
  if (!local || !domain) {
    return false;
  }

  // Regular expressions for local and domain parts
  const localRegex = /^[a-z0-9#$%&'*+/=?^_`{|}~.-]+$/i;
  const domainRegex = /^(?!-)(?!.*-\.)[a-z0-9-]+\.[a-z]{2,}$/i;

  // Check local part
  if (!localRegex.test(local)) {
    return false;
  }

  // Check if domain is an IP address
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipRegex.test(domain)) {
    return true;
  }

  // Validate the domain part (if it's not an IP address)
  if (!domainRegex.test(domain)) {
    return false;
  }

  // Check against blacklist
  if (blacklist && blacklist.includes(domain)) {
    return false;
  }

  // Check against whitelist
  if (whitelist && !whitelist.includes(domain)) {
    return false;
  }

  return true;
}
