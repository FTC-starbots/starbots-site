/**
 * Sessão via cookie assinado (HMAC). Uso interno da API de auth.
 */

import crypto from 'crypto';

const COOKIE_NAME = 'starbots_sess';
const MAX_AGE_DAYS = 7;

function base64UrlEncode(buf) {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(String(buf), 'utf8');
  return b
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64');
}

export function createSessionCookie(email, secret) {
  if (!secret) return null;
  const exp = Date.now() + MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ email: email.toLowerCase(), exp });
  const payloadB64 = base64UrlEncode(Buffer.from(payload, 'utf8'));
  const sig = crypto.createHmac('sha256', secret).update(payloadB64).digest();
  const sigB64 = base64UrlEncode(sig);
  const value = payloadB64 + '.' + sigB64;
  const isProd = process.env.VERCEL_ENV === 'production';
  return `${COOKIE_NAME}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_DAYS * 24 * 60 * 60}${isProd ? '; Secure' : ''}`;
}

export function verifySession(cookieHeader, secret) {
  if (!secret || !cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (!match) return null;
  const value = match[1].trim();
  const dot = value.indexOf('.');
  if (dot === -1) return null;
  const payloadB64 = value.slice(0, dot);
  const sigB64 = value.slice(dot + 1);
  try {
    const sig = base64UrlDecode(sigB64);
    const expected = crypto.createHmac('sha256', secret).update(payloadB64).digest();
    if (sig.length !== expected.length || !crypto.timingSafeEqual(sig, expected)) return null;
    const payload = JSON.parse(Buffer.from(base64UrlDecode(payloadB64).toString('utf8')));
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload.email;
  } catch {
    return null;
  }
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
