import { describe, it, expect } from 'vitest';
import { isEmail } from './isEmail';

describe('isEmail', () => {
  it('should return true for a valid email without options', () => {
    expect(isEmail('test@example.com')).toBe(true);
    expect(isEmail('user123@mail.co')).toBe(true);
    expect(isEmail('name.lastname@domain.org')).toBe(true);
  });

  it('should return false for an invalid email without options', () => {
    expect(isEmail('invalid-email')).toBe(false);
    expect(isEmail('test@invalid.')).toBe(false);
    expect(isEmail('test@.com')).toBe(false);
    expect(isEmail('@missinglocal.com')).toBe(false);
    expect(isEmail('missingdomain@.com')).toBe(false);
    expect(isEmail('test@domain..com')).toBe(false);
  });

  it('should return false if email length exceeds maxLength', () => {
    expect(isEmail('a'.repeat(255) + '@example.com', { maxLength: 254 })).toBe(false);
    expect(isEmail('a'.repeat(300) + '@longemail.com', { maxLength: 255 })).toBe(false);
    expect(isEmail('a'.repeat(242) + '@example.com', { maxLength: 255 })).toBe(true);
    expect(isEmail('a'.repeat(254) + '@example.com', { maxLength: 255 })).toBe(false);
    expect(isEmail('test@example.com', { maxLength: 255 })).toBe(true);
    expect(isEmail('test@example.com', { maxLength: 10 })).toBe(false);
  });

  it('should return false for a blacklisted domain', () => {
    expect(isEmail('test@blacklist.com', { blacklist: ['blacklist.com'] })).toBe(false);
    expect(isEmail('test@banned.com', { blacklist: ['blacklist.com', 'banned.com'] })).toBe(false);
    expect(isEmail('test@spammer.com', { blacklist: ['spammer.com'] })).toBe(false);
    expect(isEmail('user@allowed.com', { blacklist: ['blacklist.com'] })).toBe(true);
    expect(isEmail('test@blacklist.com', { blacklist: ['blacklist.com', 'blocked.com'] })).toBe(false);
    expect(isEmail('test@domain.com', { blacklist: ['blacklist.com', 'blocked.com'] })).toBe(true);
  });

  it('should return true for a whitelisted domain', () => {
    expect(isEmail('test@whitelist.com', { whitelist: ['whitelist.com'] })).toBe(true);
    expect(isEmail('user@allowed.com', { whitelist: ['allowed.com', 'whitelist.com'] })).toBe(true);
    expect(isEmail('test@whitelist.com', { whitelist: ['whitelist.com', 'allowed.com'] })).toBe(true);
    expect(isEmail('test@notwhitelisted.com', { whitelist: ['whitelist.com'] })).toBe(false);
    expect(isEmail('test@whitelist.com', { whitelist: ['whitelist.com', 'another.com'] })).toBe(true);
    expect(isEmail('user@other.com', { whitelist: ['whitelist.com'] })).toBe(false);
  });

  it('should return true for an email with an IP domain', () => {
    expect(isEmail('test@192.168.1.1')).toBe(true);
    expect(isEmail('user@10.0.0.1')).toBe(true);
    expect(isEmail('test@127.0.0.1')).toBe(true);
    expect(isEmail('user@255.255.255.255')).toBe(true);
    expect(isEmail('admin@0.0.0.0')).toBe(true);
    expect(isEmail('test@192.168.0.256')).toBe(false);
  });

  it('should return false for an invalid IP domain', () => {
    expect(isEmail('test@999.999.999.999')).toBe(false);
    expect(isEmail('user@300.300.300.300')).toBe(false);
    expect(isEmail('test@192.168.1.999')).toBe(false);
    expect(isEmail('user@256.256.256.256')).toBe(false);
    expect(isEmail('admin@127.0.0.999')).toBe(false);
    expect(isEmail('test@200.300.400.500')).toBe(false);
  });

  it('should return false for an email with invalid local part', () => {
    expect(isEmail('invalid!email@example.com')).toBe(false);
    expect(isEmail('test@subdomain.-example.com')).toBe(false);
    expect(isEmail('test@subdomain..example.com')).toBe(false);
    expect(isEmail('user@domain.com#extra')).toBe(false);
    expect(isEmail('test@domain_.com')).toBe(false);
    expect(isEmail('test@subdomain..com')).toBe(false);
  });
});
