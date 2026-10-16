export function sanitizeUrl(url?: string | null): string | undefined {
  if (!url || typeof url !== 'string') {
    return undefined;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return undefined;
  }

  const normalized = Array.from(trimmed)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return !(code <= 0x1f || (code >= 0x7f && code <= 0x9f) || /\s/.test(char));
    })
    .join('');

  if (/^(?:javascript|data|vbscript|file|blob):/i.test(normalized)) {
    return undefined;
  }

  if (trimmed.startsWith('//') || trimmed.startsWith('/\\') || trimmed.startsWith('\\')) {
    return undefined;
  }

  if (/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(trimmed)) {
    return trimmed;
  }

  if (
    /^(?:mailto:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+|tel:[+0-9\s()-]+)$/i.test(trimmed)
  ) {
    return trimmed;
  }

  if (trimmed.startsWith('/') && !trimmed.startsWith('//') && !trimmed.startsWith('/\\')) {
    return trimmed;
  }

  return undefined;
}

export function isSafeUrl(url?: string | null): boolean {
  return sanitizeUrl(url) !== undefined;
}

export function sanitizeRedirectPath(path?: string | null, fallback = '/'): string {
  if (!path || typeof path !== 'string') {
    return fallback;
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return fallback;
  }

  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('/\\') ||
    trimmed.startsWith('\\') ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
  ) {
    return fallback;
  }

  if (!trimmed.startsWith('/')) {
    return `/${trimmed}`;
  }

  return trimmed;
}

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
