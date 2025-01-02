# `isEmail` Function

This function validates if a given string is a valid email address.

## Function

```typescript
function isEmail(email: string): boolean;
```

### Parameters

- **email**: A string to validate as an email address.

### Returns

- **`true`** if the email is valid.
- **`false`** if the email is invalid.

## Usage

```typescript
import { isEmail } from "./isEmail";

console.log(isEmail("test@example.com")); // true
console.log(isEmail("invalid-email.com")); // false
console.log(isEmail("email@123.123.123.123")); // true
console.log(isEmail(".user@domain.com")); // false
console.log(isEmail("user@domain..com")); // false
```
