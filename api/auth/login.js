/**
 * POST /api/auth/login — valida email/senha e define cookie de sessão.
 * Credenciais via env: ALLOWED_LOGIN_EMAIL, ALLOWED_LOGIN_PASSWORD, SESSION_SECRET.
 */

import { createSessionCookie } from '../lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const secret = process.env.SESSION_SECRET;
  const allowedEmail = (process.env.ALLOWED_LOGIN_EMAIL || '').trim().toLowerCase();
  const allowedPassword = process.env.ALLOWED_LOGIN_PASSWORD;

  if (!secret || !allowedEmail || !allowedPassword) {
    console.error('Auth: SESSION_SECRET, ALLOWED_LOGIN_EMAIL ou ALLOWED_LOGIN_PASSWORD não configurados');
    return res.status(500).json({ error: 'Login não configurado' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const email = (body.email || '').trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  if (email !== allowedEmail || password !== allowedPassword) {
    return res.status(401).json({ error: 'Email ou senha inválidos' });
  }

  const cookie = createSessionCookie(email, secret);
  if (!cookie) {
    return res.status(500).json({ error: 'Erro ao criar sessão' });
  }

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ ok: true });
}
