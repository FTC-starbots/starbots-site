/**
 * API de upload de foto para a biblioteca de prêmios.
 * POST: body JSON { image: "base64...", label?: string } → upload no Blob e adiciona à library.
 */

const LIBRARY_PATH = 'awards/photo-library.json';

async function getBlobJson(blob) {
  if (!blob || !blob.stream) return null;
  const text = await new Response(blob.stream).text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function readLibrary(blob) {
  const list = await getBlobJson(blob);
  return Array.isArray(list) ? list : [];
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Storage não configurado' });
  }

  const { put, get } = await import('@vercel/blob');

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const { image, label } = body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Campo image (base64) é obrigatório' });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const ext = (body.contentType && body.contentType.split('/')[1]) || 'png';
    const safeExt = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext.toLowerCase()) ? ext : 'png';
    const id = 'upload-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    const blobPath = `awards/uploads/${id}.${safeExt}`;

    await put(blobPath, buffer, {
      access: 'public',
      contentType: `image/${safeExt}`,
      addRandomSuffix: false,
      token,
    });

    const blobInfo = await get(blobPath, { token });
    const url = blobInfo?.url || `/${blobPath}`;

    let blob = await get(LIBRARY_PATH, { access: 'public', token }).catch(() => null);
    let library = await readLibrary(blob);
    const entry = { id, url, label: label ? String(label).trim() : id };
    library.push(entry);

    await put(LIBRARY_PATH, JSON.stringify(library, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });

    return res.status(201).json(entry);
  } catch (err) {
    console.error('Erro API awards/upload-photo:', err);
    return res.status(500).json({ error: 'Erro ao processar upload' });
  }
}
