![NPM Downloads](https://img.shields.io/npm/dy/%40nightlightmare%2Fisvalid)
![NPM Version](https://img.shields.io/npm/v/%40nightlightmare%2Fisvalid)

# isValid Package

The `isValid` package provides two utility functions for validating common types of data: emails and URLs.

## Functions

### isEmail

`isEmail(email: string, options?: { blacklist?: string[], whitelist?: string[], maxLength?: number }): boolean`

Validates whether the given string is a valid email with additional options.

#### Parameters:

- `email`: The string to validate (type: `string`).
- `options`: An optional object that allows you to customize the validation:
  - `blacklist` (optional): A list of blacklisted domains to reject.
  - `whitelist` (optional): A list of whitelisted domains to allow.
  - `maxLength` (optional): Maximum allowed length for the email.

#### Returns:

- `true` if the string is a valid email.
- `false` otherwise.

#### Example:

```ts
import { isEmail } from "@nightlightmare/isvalid";

const result = isEmail("example@example.com", {
  blacklist: ["example.com"],
  whitelist: ["example.org"],
  maxLength: 100,
});
console.log(result); // Output: false
```

---

### isUrl

`isUrl(url: string, options?: { whitelist?: UrlValidationRules, blacklist?: UrlValidationRules }): boolean`

Validates whether the given string is a valid URL with additional options.

#### Parameters:

- `url` (string): The string to validate as a URL.
- `options` (optional object): Contains additional validation rules for the URL:
  - `whitelist` (optional): Specifies the allowed parts of the URL (protocol, domain, port, path, query, fragment).
  - `blacklist` (optional): Specifies the restricted parts of the URL (protocol, domain, port, path, query, fragment).

#### Returns:

- Returns `true` if the `url` is a valid URL and matches the rules provided in `whitelist` and doesn't match any rules in `blacklist`.
- Returns `false` if the `url` is invalid or doesn't meet the conditions specified in the `whitelist` or `blacklist`.

#### Example:

```ts
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

---

## Installation

To install the package, use your preferred package manager:

### Using npm:

```bash
npm install @nightlightmare/isvalid
```

### Using yarn:

```bash
yarn add @nightlightmare/isvalid
```

### Using pnpm:

```bash
pnpm add @nightlightmare/isvalid
```

## License

This project is licensed under the Apache License Version 2.0.
