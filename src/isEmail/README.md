# `isEmail` Function

## Description

The `isEmail` function is a utility that validates if a given string is a valid email address with additional options. It checks the email format, domain rules, and custom validation options such as blacklisting, whitelisting, and maximum length constraints.

## Function Signature

```typescript
function isEmail(
  email: string,
  options?: {
    blacklist?: string[];
    whitelist?: string[];
    maxLength?: number;
  }
): boolean;
```

## Parameters

- `email` (string): The string that will be validated as an email address.
- `options` (optional object):
  - `blacklist` (string[]): An array of blacklisted domains to reject.
  - `whitelist` (string[]): An array of whitelisted domains to allow.
  - `maxLength` (number): The maximum allowed length for the email.

## Returns

- Returns `true` if the email is valid according to the provided criteria, otherwise returns `false`.

## Validation Process

The `isEmail` function performs the following checks:

1. **Length Check**: If a `maxLength` is provided, it ensures that the email does not exceed the specified length.
2. **Local Part Validation**: The local part (before the '@') is validated using a regular expression that allows alphanumeric characters and special characters such as `.`, `+`, `-`, etc.
3. **Domain Part Validation**: The domain part (after the '@') is validated using a regular expression that ensures the domain is well-formed, excluding invalid characters and patterns (such as domain starting or ending with a dash or having consecutive dots).
4. **IP Address Check**: If the domain is an IP address, it will pass the validation.
5. **Blacklist Check**: If a blacklist is provided, the domain will be rejected if it matches any of the blacklisted domains.
6. **Whitelist Check**: If a whitelist is provided, the domain will only pass if it matches one of the whitelisted domains.

## Example Usage

```typescript
// Valid email with no extra options
console.log(isEmail("test@example.com")); // true

// Invalid email (contains an invalid character in the local part)
console.log(isEmail("invalid!email@example.com")); // false

// Email with domain blacklisting
console.log(
  isEmail("test@blacklisted.com", { blacklist: ["blacklisted.com"] })
); // false

// Email with domain whitelisting
console.log(
  isEmail("test@whitelisted.com", { whitelist: ["whitelisted.com"] })
); // true

// Email with a length limit
console.log(isEmail("a".repeat(24) + "@example.com", { maxLength: 255 })); // true
console.log(isEmail("a".repeat(256) + "@example.com", { maxLength: 255 })); // false
```

## Regular Expressions Used

- **Local Part Validation**: The local part of the email (before the '@') is validated using this regular expression:

  ```typescript
  /^[a-z0-9#$%&'*+/=?^_`{|}~.-]+$/i;
  ```

- **Domain Part Validation**: The domain part (after the '@') is validated with:

  ```typescript
  /^(?!-)(?!.*-\.)[a-z0-9-]+\.[a-z]{2,}$/i;
  ```

- **IP Address Validation**: The domain part is also checked to see if it is a valid IP address using:

  ```typescript
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  ```

## Installation

To use this function in your project, simply import it:

```typescript
import { isEmail } from "@nightlightmare/isvalid";
```
