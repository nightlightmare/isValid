import { describe, it, expect } from 'vitest';
import { isEmail } from './isEmail';

describe('isEmail', () => {
  it('should return true for valid emails', () => {
    expect(isEmail('test@example.com')).toBe(true);
    expect(isEmail('user.name+tag@domain.co.uk')).toBe(true);
    expect(isEmail('email@sub.domain.com')).toBe(true);
    expect(isEmail('firstname.lastname@example.org')).toBe(true);
    expect(isEmail('1234567890@example.com')).toBe(true);
    expect(isEmail('email@123.123.123.123')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(isEmail('plainaddress')).toBe(false);
    expect(isEmail('@missinglocalpart.com')).toBe(false);
    expect(isEmail('invalid-email.com')).toBe(false);
    expect(isEmail('user@domain,com')).toBe(false);
    expect(isEmail('.user@domain,com')).toBe(false);
    expect(isEmail('user@domain..com')).toBe(false);
  });
});
