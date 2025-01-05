/**
 * Represents the structure for URL validation rules.
 */
export type UrlValidationRules = {
  protocol?: string[];
  domain?: string[];
  port?: string[];
  path?: string[];
  query?: string[];
  fragment?: string[];
};

/**
 * Validates if the given string is a valid URL and matches additional validation rules.
 * @param url - The string to validate.
 * @param options - Additional validation options.
 * @param options.whitelist - Object specifying allowed parts of the URL.
 * @param options.blacklist - Object specifying restricted parts of the URL.
 * @returns True if the string is a valid URL and passes the whitelist/blacklist checks, otherwise false.
 * @see https://github.com/nightlightmare/isValid/blob/main/src/isUrl
 */
export function isUrl(
  url: string,
  options?: {
    whitelist?: UrlValidationRules;
    blacklist?: UrlValidationRules;
  }
): boolean {
  // Step 1: Validate the URL using the regex
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  if (!urlRegex.test(url)) {
    return false;
  }

  // Step 2: Parse the URL to its components
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return false;
  }

  const { protocol, hostname, port, pathname, search, hash } = parsedUrl;

  // Helper function to match against whitelist/blacklist rules
  const matchesRules = (rules: UrlValidationRules | undefined, key: string, value: string | null): boolean => {
    if (!rules || !rules[key as keyof UrlValidationRules]) return true;
    const ruleList = rules[key as keyof UrlValidationRules] as string[];
    return ruleList.includes(value || "");
  };

  // Step 3: Validate against whitelist
  if (options?.whitelist) {
    if (
      !matchesRules(options.whitelist, "protocol", protocol.replace(":", "")) ||
      !matchesRules(options.whitelist, "domain", hostname) ||
      !matchesRules(options.whitelist, "port", port) ||
      !matchesRules(options.whitelist, "path", pathname) ||
      !matchesRules(options.whitelist, "query", search.replace("?", "")) ||
      !matchesRules(options.whitelist, "fragment", hash.replace("#", ""))
    ) {
      return false;
    }
  }

  // Step 4: Validate against blacklist
  if (options?.blacklist) {
    if (
      matchesRules(options.blacklist, "protocol", protocol.replace(":", "")) ||
      matchesRules(options.blacklist, "domain", hostname) ||
      matchesRules(options.blacklist, "port", port) ||
      matchesRules(options.blacklist, "path", pathname) ||
      matchesRules(options.blacklist, "query", search.replace("?", "")) ||
      matchesRules(options.blacklist, "fragment", hash.replace("#", ""))
    ) {
      return false;
    }
  }

  return true;
}

