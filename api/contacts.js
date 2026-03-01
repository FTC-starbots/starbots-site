/**
 * API de contatos - armazena dados no Vercel Blob (JSON).
 * GET: lista contatos | POST: adiciona contato
 */

const BLOB_PATH = 'contacts/contacts.json';

async function readContacts(blob) {
  const list = await getBlobJson(blob);
  return Array.isArray(list) ? list : [];
}

async function getBlobJson(blob) {
  if (!blob || !blob.stream) return null;
  const text = await new Response(blob.stream).text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('BLOB_READ_WRITE_TOKEN não configurado');
    return res.status(500).json({ error: 'Storage não configurado' });
  }

  const { get, put } = await import('@vercel/blob');

  try {
    if (req.method === 'GET') {
      const blob = await get(BLOB_PATH, {
        access: 'private',
        token,
      }).catch(() => null);

      const contacts = await readContacts(blob);
      return res.status(200).json(contacts);
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const { nome, email, mensagem } = body;

      if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
      }

      const blob = await get(BLOB_PATH, {
        access: 'private',
        token,
      }).catch(() => null);

      const contacts = await readContacts(blob);
      const newContact = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        nome: String(nome).trim(),
        email: String(email).trim().toLowerCase(),
        mensagem: mensagem ? String(mensagem).trim() : '',
        createdAt: new Date().toISOString(),
      };
      contacts.push(newContact);

      await put(BLOB_PATH, JSON.stringify(contacts, null, 2), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
      });

      return res.status(201).json(newContact);
    }
  } catch (err) {
    console.error('Erro API contatos:', err);
    return res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
}
