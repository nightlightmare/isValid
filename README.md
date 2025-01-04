![NPM Downloads](https://img.shields.io/npm/dy/%40nightlightmare%2Fisvalid)
![NPM Version](https://img.shields.io/npm/v/%40nightlightmare%2Fisvalid)

# isValid Package

The `isValid` package provides two utility functions for validating common types of data: emails and URLs.

## Functions

### `isEmail(email: string, options?: { blacklist?: string[], whitelist?: string[], maxLength?: number }): boolean`

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

### `isUrl(url: string): boolean`

Validates whether the given string is a valid URL.

#### Parameters:

- `url`: The string to validate (type: `string`).

#### Returns:

- `true` if the string is a valid URL.
- `false` otherwise.

#### Example:

```ts
import { isUrl } from "@nightlightmare/isvalid";

const result = isUrl("https://www.example.com");
console.log(result); // Output: true
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
