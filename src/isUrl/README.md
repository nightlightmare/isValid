# isUrl Function - URL Validation with Whitelist and Blacklist

This JavaScript function validates a URL and checks if it matches additional validation rules specified via `whitelist` and `blacklist` options.

## Function: `isUrl(url: string, options?: { whitelist?: UrlValidationRules, blacklist?: UrlValidationRules }): boolean`

### Parameters

- `url` (string): The string to validate as a URL.
- `options` (optional object): Contains additional validation rules for the URL:
  - `whitelist` (optional): Specifies the allowed parts of the URL (protocol, domain, port, path, query, fragment).
  - `blacklist` (optional): Specifies the restricted parts of the URL (protocol, domain, port, path, query, fragment).

### `UrlValidationRules` Structure

The `UrlValidationRules` type contains the following optional properties:

- `protocol`: List of allowed protocols (e.g., `['http', 'https']`).
- `domain`: List of allowed domains (e.g., `['example.com']`).
- `port`: List of allowed ports (e.g., `['8080']`).
- `path`: List of allowed URL paths (e.g., `['/home', '/about']`).
- `query`: List of allowed query parameters (e.g., `['id=123']`).
- `fragment`: List of allowed fragments (e.g., `['#section']`).

### Return Value

- Returns `true` if the `url` is a valid URL and matches the rules provided in `whitelist` and doesn't match any rules in `blacklist`.
- Returns `false` if the `url` is invalid or doesn't meet the conditions specified in the `whitelist` or `blacklist`.

### Example Usage

```javascript
import { isUrl } from "@nightlightmare/isvalid";

const options = {
  whitelist: {
    protocol: ["https"],
    domain: ["example.com"],
    path: ["/home"],
  },
  blacklist: {
    query: ["id=456"],
  },
};

const isValid = isUrl("https://example.com/home?id=123", options);
console.log(isValid); // Output: true
```

### Notes

- The function first validates the URL using a regular expression to check if it follows the general format of a URL.
- Then it parses the URL into its components (protocol, domain, port, path, query, fragment).
- The function checks if the URL matches any rules in the `whitelist` and does not match any rules in the `blacklist`.
- If the URL fails any of the conditions, the function will return `false`.
