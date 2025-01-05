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

  describe("whitelist rules", () => {
    it("should return true if the URL matches the whitelist", () => {
      const options = {
        whitelist: {
          protocol: ["https"],
          domain: ["example.com"],
        },
      };
      expect(isUrl("https://example.com", options)).toBe(true);
    });

    it("should return false if URL is not valid and cannot be parsed", () => {
      expect(isUrl("http://example.com:xyz")).toBe(false);
      expect(isUrl("http://example.com/space here")).toBe(false);
    });

    it("should return false if the URL does not match the whitelist", () => {
      const options = {
        whitelist: {
          protocol: ["https"],
          domain: ["example.com"],
          port: ["8080"],
          path: ["/test"],
          query: ["id=123"],
          fragment: ["section1"],
        },
      };

      expect(isUrl("http://example.com", options)).toBe(false);
      expect(isUrl("https://notexample.com", options)).toBe(false);
      expect(isUrl("https://example.com:9090", options)).toBe(false);
      expect(isUrl("https://example.com/test", options)).toBe(false);
      expect(isUrl("https://example.com?name=abc", options)).toBe(false);
      expect(isUrl("https://example.com#section2", options)).toBe(false);
    });
  });

  describe("blacklist rules", () => {
    it("should return false if the URL matches the blacklist", () => {
      const options = {
        blacklist: {
          protocol: ["ftp"],
          domain: ["malicious.com"],
        },
      };
      expect(isUrl("ftp://malicious.com", options)).toBe(false);
      expect(isUrl("https://malicious.com", options)).toBe(false);
    });

    it("should return true if the URL does not match the blacklist", () => {
      const options = {
        blacklist: {
          protocol: ["ftp"],
          domain: ["malicious.com"],
        },
      };
      expect(isUrl("https://example.com", options)).toBe(true);
      expect(isUrl("http://example.com", options)).toBe(true);
    });
  });

  describe("combined whitelist and blacklist rules", () => {
    it("should return true if the URL matches whitelist and not blacklist", () => {
      const options = {
        whitelist: {
          protocol: ["https"],
          domain: ["example.com"],
        },
        blacklist: {
          path: ["/blocked"],
        },
      };
      expect(isUrl("https://example.com", options)).toBe(true);
    });

    it("should return false if the URL matches whitelist but also matches blacklist", () => {
      const options = {
        whitelist: {
          protocol: ["https"],
          domain: ["example.com"],
        },
        blacklist: {
          path: ["/blocked"],
        },
      };
      expect(isUrl("https://example.com/blocked", options)).toBe(false);
    });
  });
});
