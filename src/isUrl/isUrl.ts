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
 * @returns True if the string is a valid URL and passes the whitelist/blacklist checks, otherwise false. * 
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

  // Step 2: Parse the URL
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return false;
  }

  const { protocol, hostname, port, pathname, search, hash } = parsedUrl;

  // Step 3: Helper function for matching against rules
  const matchesRules = (
    rules: UrlValidationRules | undefined,
    key: keyof UrlValidationRules,
    value: string | null
  ): boolean => {
    if (!rules || !rules[key]) return true; // No rules to validate
    const ruleList = rules[key]!;
    return ruleList.includes(value || "");
  };

  // Step 4: Check whitelist
  if (options?.whitelist) {
    if (
      (options.whitelist.protocol && !matchesRules(options.whitelist, "protocol", protocol.replace(":", ""))) ||
      (options.whitelist.domain && !matchesRules(options.whitelist, "domain", hostname)) ||
      (options.whitelist.port && !matchesRules(options.whitelist, "port", port)) ||
      (options.whitelist.path && !matchesRules(options.whitelist, "path", pathname)) ||
      (options.whitelist.query && !matchesRules(options.whitelist, "query", search.replace("?", ""))) ||
      (options.whitelist.fragment && !matchesRules(options.whitelist, "fragment", hash.replace("#", "")))
    ) {
      return false;
    }
  }

  // Step 5: Check blacklist
  if (options?.blacklist) {
    if (
      (options.blacklist.protocol && matchesRules(options.blacklist, "protocol", protocol.replace(":", ""))) ||
      (options.blacklist.domain && matchesRules(options.blacklist, "domain", hostname)) ||
      (options.blacklist.port && matchesRules(options.blacklist, "port", port)) ||
      (options.blacklist.path && matchesRules(options.blacklist, "path", pathname)) ||
      (options.blacklist.query && matchesRules(options.blacklist, "query", search.replace("?", ""))) ||
      (options.blacklist.fragment && matchesRules(options.blacklist, "fragment", hash.replace("#", "")))
    ) {
      return false;
    }
  }

  return true;
}
