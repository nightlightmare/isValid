# isUrl Function

This repository provides a simple and lightweight utility function, `isUrl`, to validate whether a given string is a valid URL. The function uses a regular expression to check the URL format and supports protocols like `http`, `https`, and `ftp`.

## Installation

You can import the `isUrl` function into your project. For instance:

### TypeScript/JavaScript
```javascript
import { isUrl } from "@nightlightmare/isvalid";
```

## Usage

### Function Signature
```typescript
/**
 * Validates if the given string is a valid URL.
 * @param url - The string to validate.
 * @returns True if the string is a valid URL, otherwise false.
 */
function isUrl(url: string): boolean;
```

### Example

```javascript
import { isUrl } from './isUrl';

console.log(isUrl("http://example.com")); // true
console.log(isUrl("https://example.com")); // true
console.log(isUrl("ftp://example.com")); // true
console.log(isUrl("example")); // false
console.log(isUrl("http:/example.com")); // false
```

## How it Works

The `isUrl` function uses the following regular expression to validate URLs:
```regex
/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
```
### Explanation:
1. **Protocol Validation**: Checks for `http`, `https`, or `ftp` at the start of the string.
2. **Format Check**: Ensures that the URL contains a valid structure after the protocol, including domain and optional paths or query strings.
3. **Invalid Characters**: Ensures that spaces and certain special characters are not included.

## Limitations

- This function only validates the format of the URL and does not check for the existence or reachability of the URL.
- Non-URL strings, like `example.com` (missing protocol), will be considered invalid.

## References

- [GitHub Source Code](https://github.com/nightlightmare/isValid/blob/main/src/isUrl)
