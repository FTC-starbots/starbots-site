/**
 * API da biblioteca de fotos de prêmios - GET lista (admin).
 * Seed inicial com paths estáticos se o blob estiver vazio.
 */

const LIBRARY_PATH = 'awards/photo-library.json';

const SEED_PHOTOS = [
  { id: 'regional-decode', url: '/awards/new-awards-black/regional-decode-copiar-black.png', label: 'Regional DECODE' },
  { id: 'sinos-valley', url: '/awards/new-awards-black/sinos-valley-black.png', label: 'Sinos Valley' },
  { id: 'amistoso-decode', url: '/awards/new-awards-black/amistoso-decode-power-play-black.png', label: 'Amistoso DECODE' },
  { id: 'premiere-holanda', url: '/awards/new-awards-black/premiere-holanda-into-the-deep-copiar-black.png', label: 'European Premier Holanda' },
  { id: 'duas-regional', url: '/awards/new-awards-black/duas-regional-into-the-deep-black.png', label: 'Regionais INTO THE DEEP' },
  { id: 'nacional', url: '/awards/new-awards-black/nacional-black.png', label: 'Nacional Festival SESI' },
  { id: 'congresso-inovacao', url: '/awards/new-awards-black/congresso-inovacao-freight-frenzy-black.png', label: 'Congresso de Inovação' },
];

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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Storage não configurado' });
  }

  const { get, put } = await import('@vercel/blob');

  try {
    let blob = await get(LIBRARY_PATH, { access: 'public', token }).catch(() => null);
    let library = await readLibrary(blob);

    if (library.length === 0) {
      library = [...SEED_PHOTOS];
      await put(LIBRARY_PATH, JSON.stringify(library, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
      });
    }

    return res.status(200).json(library);
  } catch (err) {
    console.error('Erro API awards/library:', err);
    return res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
}
