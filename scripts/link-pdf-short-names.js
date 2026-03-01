/**
 * Cria cópias dos PDFs com nomes curtos (1.pdf, 2.pdf, ...) para URLs
 * funcionarem no vercel dev e em produção (evita 404 por encoding/caminho).
 *
 * Uso: node scripts/link-pdf-short-names.js
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '..', 'public', 'indicacoes-docs');

const files = fs.readdirSync(DOCS_DIR)
  .filter((f) => f.toLowerCase().endsWith('.pdf') && !/^\d+\.pdf$/.test(f))
  .sort();

if (files.length === 0) {
  console.log('Nenhum PDF com nome longo encontrado.');
  process.exit(0);
}

for (let i = 0; i < files.length; i++) {
  const shortName = `${i + 1}.pdf`;
  const src = path.join(DOCS_DIR, files[i]);
  const dest = path.join(DOCS_DIR, shortName);
  if (src === dest) continue;
  fs.copyFileSync(src, dest);
  console.log(`${files[i]} -> ${shortName}`);
}
console.log('Pronto. Links no HTML devem apontar para 1.pdf, 2.pdf, etc.');
