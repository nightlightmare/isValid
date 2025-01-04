import { describe, it, expect } from "vitest";
import { isUrl } from "./isUrl";

describe("isUrl", () => {
  it("should return true for valid URLs", () => {
    expect(isUrl("http://example.com")).toBe(true);
    expect(isUrl("https://example.com")).toBe(true);
    expect(isUrl("https://sub.example.com")).toBe(true);
    expect(isUrl("https://example.com/path?query=value#hash")).toBe(true);
    expect(isUrl("ftp://example.com")).toBe(true);
  });

  it("should return false for invalid URLs", () => {
    expect(isUrl("example")).toBe(false);
    expect(isUrl("http:/example.com")).toBe(false);
    expect(isUrl("://example.com")).toBe(false);
    expect(isUrl("example.com")).toBe(false);
    expect(isUrl("")).toBe(false);
    expect(isUrl("http//example")).toBe(false);
  });

  it("should return false for non-string inputs", () => {
    // @ts-expect-error Testing invalid input
    expect(isUrl(undefined)).toBe(false);
    // @ts-expect-error Testing invalid input
    expect(isUrl(null)).toBe(false);
    // @ts-expect-error Testing invalid input
    expect(isUrl(123)).toBe(false);
  });
});
