/**
 * API de premiações - armazena no Vercel Blob (awards.json).
 * GET: lista premiações (público) | POST: criar/atualizar (admin) | DELETE: remover (admin)
 */

const BLOB_PATH = 'awards/awards.json';

const SEED_AWARDS = [
  { id: 'decode-2526', ano: '2025/2026', nomeTemporada: 'DECODE', fotoRobo: '/seasons/decode.webp', premios: ['Prêmio Inspiração (Off Season São João del Rei);', 'Aliança Vencedora (Off Season São João del Rei);', 'Prêmio Inspiração (Regional Brazil - Festival SESI);', 'Aliança Finalista (Regional Brazil - Festival SESI);', 'Aliança Vencedora (Off Season Sinos Valley);', 'Mais que Robôs (Off Season Sinos Valley).'], fotosPremios: ['regional-decode', 'sinos-valley', 'amistoso-decode'] },
  { id: 'intothedeep-2425', ano: '2024/2025', nomeTemporada: 'INTO THE DEEP', fotoRobo: '/seasons/into-the-deep.webp', premios: ['Prêmio Controle - 2° lugar (Internacional - European Premier Holanda);', 'Prêmio Inspiração (Off Season Divinópolis);', 'Pensamento Criativo (Regional Brazil - Festival SESI);', 'Inspiração - 3° lugar (Nacional - Festival SESI).'], fotosPremios: ['premiere-holanda', 'duas-regional', 'nacional'] },
  { id: 'centerstage-2324', ano: '2023/2024', nomeTemporada: 'CENTERSTAGE', fotoRobo: '/seasons/centerstage.webp', premios: ['Inovação by Raytheon (Nacional - Festival SESI);', 'Prêmio Inspiração (Off Season Nerd Experience / Amistoso Minas Gerais).'], fotosPremios: ['nacional'] },
  { id: 'powerplay-2223', ano: '2022/2023', nomeTemporada: 'POWERPLAY', fotoRobo: '/seasons/powewrplay.webp', premios: ['Prêmio de Design - 2° lugar (Nacional - Festival SESI);', 'Aliança Finalista (Off Season Minas Gerais).'], fotosPremios: ['nacional', 'amistoso-decode'] },
  { id: 'freight-2122', ano: '2021/2022', nomeTemporada: 'FREIGHT FRENZY', fotoRobo: '/seasons/freight-frenzy.webp', premios: ['Prêmio de Design (Nacional - Festival SESI);', 'Aliança Finalista (Congresso de Inovação).'], fotosPremios: ['congresso-inovacao', 'nacional'] },
  { id: 'ultimate-2021', ano: '2020/2021', nomeTemporada: 'ULTIMATE GOAL', fotoRobo: '/seasons/ultimate-goal.webp', premios: ['Equipe Top Ranked - 2° lugar (Nacional - Festival SESI);', 'Inovação Rockwell Collins (Nacional - Festival SESI).'], fotosPremios: ['nacional'] },
  { id: 'skystone-1920', ano: '2019/2020', nomeTemporada: 'SKYSTONE', fotoRobo: '/seasons/skystone.webp', premios: ['Prêmio Divulgação (Nacional - Festival SESI).'], fotosPremios: ['nacional'] },
  { id: 'rover-1819', ano: '2018/2019', nomeTemporada: 'ROVER RUCKUS', fotoRobo: '/seasons/rover-ruckus.webp', premios: ['Aliança Finalista (Nacional - Festival SESI);', 'Prêmio de Controle (Nacional - Festival SESI);', 'Prêmio Divulgação (Nacional - Festival SESI).'], fotosPremios: ['nacional'] },
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

async function readAwards(blob) {
  const list = await getBlobJson(blob);
  return Array.isArray(list) ? list : [];
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!['GET', 'POST', 'DELETE'].includes(req.method)) {
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
      let blob = await get(BLOB_PATH, { access: 'public', token }).catch(() => null);
      let awards = await readAwards(blob);
      if (awards.length === 0) {
        awards = [...SEED_AWARDS];
        await put(BLOB_PATH, JSON.stringify(awards, null, 2), {
          access: 'public',
          contentType: 'application/json',
          addRandomSuffix: false,
          allowOverwrite: true,
          token,
        });
      }
      return res.status(200).json(awards);
    }

    if (req.method === 'DELETE') {
      const id = req.query.id;
      if (!id) {
        return res.status(400).json({ error: 'Parâmetro id é obrigatório' });
      }
      const blob = await get(BLOB_PATH, { access: 'public', token }).catch(() => null);
      let awards = await readAwards(blob);
      awards = awards.filter((a) => a.id !== id);
      await put(BLOB_PATH, JSON.stringify(awards, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
      });
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const { id, ano, nomeTemporada, premios, fotoRobo, fotosPremios } = body;

      if (!ano || !nomeTemporada) {
        return res.status(400).json({ error: 'ano e nomeTemporada são obrigatórios' });
      }

      const blob = await get(BLOB_PATH, { access: 'public', token }).catch(() => null);
      let awards = await readAwards(blob);

      const payload = {
        id: id || Date.now().toString(36) + Math.random().toString(36).slice(2),
        ano: String(ano).trim(),
        nomeTemporada: String(nomeTemporada).trim(),
        premios: Array.isArray(premios) ? premios.map((p) => String(p).trim()).filter(Boolean) : [],
        fotoRobo: fotoRobo ? String(fotoRobo).trim() : '',
        fotosPremios: Array.isArray(fotosPremios) ? fotosPremios : [],
      };

      const idx = awards.findIndex((a) => a.id === payload.id);
      if (idx >= 0) {
        awards[idx] = payload;
      } else {
        awards.push(payload);
      }
      awards.sort((a, b) => (b.ano || '').localeCompare(a.ano || ''));

      await put(BLOB_PATH, JSON.stringify(awards, null, 2), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
        token,
      });
      return res.status(200).json(payload);
    }
  } catch (err) {
    console.error('Erro API awards:', err);
    return res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
}
