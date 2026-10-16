/**
 * Security and URL Sanitization Utilities for Akash Kundu Portfolio
 *
 * Provides defensive validation against Cross-Site Scripting (XSS),
 * open redirects, protocol injection, and cleartext credential handling.
 */

/**
 * Validates that an external URL or navigation link uses an allowed, safe scheme.
 * Strictly permits 'https:', 'http:', 'mailto:', 'tel:', or internal relative routes starting with single '/'.
 * Rejects 'javascript:', 'data:', 'vbscript:', 'file:', protocol-relative '//', and backslash tricks.
 */
export function sanitizeUrl(url?: string | null): string | undefined {
  if (!url || typeof url !== 'string') {
    return undefined;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return undefined;
  }

  // Strip ASCII control characters and non-printable bytes
  // eslint-disable-next-line no-control-regex
  const normalized = trimmed.replace(/[\u0000-\u001F\u007F-\u009F\s]/g, '');

  // Reject dangerous scriptable protocols and file schemes
  if (/^(?:javascript|data|vbscript|file|blob):/i.test(normalized)) {
    return undefined;
  }

  // Reject protocol-relative URLs (e.g. "//attacker.com") and backslash evasion ("/\attacker.com", "\\attacker.com")
  if (trimmed.startsWith('//') || trimmed.startsWith('/\\') || trimmed.startsWith('\\')) {
    return undefined;
  }

  // Allow standard web protocols
  if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(trimmed)) {
    return trimmed;
  }

  // Allow mailto: and tel: communication links
  if (/^(?:mailto:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+|tel:[+0-9\s()-]+)$/i.test(trimmed)) {
    return trimmed;
  }

  // Allow safe internal relative paths starting with single '/'
  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.startsWith('/\\')) {
    return trimmed;
  }

  return undefined;
}

/**
 * Determines whether a given URL is safe to render in an anchor tag.
 */
export function isSafeUrl(url?: string | null): boolean {
  return sanitizeUrl(url) !== undefined;
}

/**
 * Sanitizes internal navigation redirect paths to prevent open redirect vulnerabilities
 * (specifically mitigating CVE-2025-68470 backslash and protocol-relative bypasses).
 */
export function sanitizeRedirectPath(path?: string | null, fallback = '/'): string {
  if (!path || typeof path !== 'string') {
    return fallback;
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return fallback;
  }

  // Reject external protocols, protocol-relative, and backslash paths
  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/\\') ||
    trimmed.startsWith('\\') ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
  ) {
    return fallback;
  }

  // Ensure path starts with single '/'
  if (!trimmed.startsWith('/')) {
    return `/${trimmed}`;
  }

  return trimmed;
}

/**
 * Computes the cryptographic SHA-256 hex digest of a string using Web Crypto API.
 * Operates client-side without transmitting credentials over the network.
 */
export async function hashPasswordSha256(input: string): Promise<string> {
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error('Web Crypto API is not available in the current runtime environment.');
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}
