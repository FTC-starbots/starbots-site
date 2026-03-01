/**
 * Gera imagens PNG da primeira página de cada PDF em public/indicacoes-docs/
 * e salva em public/indicacoes-docs/covers/ com nomes fixos para a página Indicações.
 *
 * Uso: node scripts/generate-pdf-covers.js
 * Requer: npm install pdf-to-png-converter
 */

const fs = require('fs');
const path = require('path');
const { pdfToPng } = require('pdf-to-png-converter');

const DOCS_DIR = path.join(__dirname, '..', 'public', 'indicacoes-docs');
const COVERS_DIR = path.join(DOCS_DIR, 'covers');
const COVER_NAMES = [
  '1-democratizacao.png',
  '2-sustentabilidade.png',
  '3-projetos-praticos.png',
  '4-marketing-identidade.png',
  '5-parcerias.png',
];

async function main() {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error('Pasta não encontrada:', DOCS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCS_DIR)
    .filter((f) => f.toLowerCase().endsWith('.pdf') && !/^\d+\.pdf$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.error('Nenhum PDF encontrado em', DOCS_DIR);
    process.exit(1);
  }

  if (files.length !== COVER_NAMES.length) {
    console.warn(`Encontrados ${files.length} PDFs; esperados ${COVER_NAMES.length}. Serão gerados apenas os primeiros.`);
  }

  if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
  }

  for (let i = 0; i < Math.min(files.length, COVER_NAMES.length); i++) {
    const pdfPath = path.join(DOCS_DIR, files[i]);
    const outName = COVER_NAMES[i];
    const outPath = path.join(COVERS_DIR, outName);

    console.log(`Convertendo: ${files[i]} -> ${outName}`);
    try {
      const pngPages = await pdfToPng(pdfPath, {
        pagesToProcess: [1],
        returnPageContent: true,
      });
      if (pngPages[0] && pngPages[0].content) {
        fs.writeFileSync(outPath, pngPages[0].content);
        console.log('  Salvo:', outPath);
      } else {
        console.error('  Nenhum conteúdo retornado.');
      }
    } catch (err) {
      console.error('  Erro:', err.message);
    }
  }

  console.log('Concluído.');
}

main();
