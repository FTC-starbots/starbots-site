/**
 * GET /api/auth/me — retorna o email do usuário logado ou 401.
 */

import { verifySession } from '../lib/session.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  const secret = process.env.SESSION_SECRET;
  const cookieHeader = req.headers.cookie;
  const email = verifySession(cookieHeader, secret);
  if (!email) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  return res.status(200).json({ email });
}
