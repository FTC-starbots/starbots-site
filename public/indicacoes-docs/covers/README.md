# Capas dos PDFs (preview na página Indicações)

Imagens da **primeira página (capa)** de cada PDF exibidas como preview nos cartões.

## Nomes dos arquivos (PNG)

| Arquivo        | PDF correspondente |
|----------------|--------------------|
| `1-democratizacao.png` | A Democratização da Robótica em Prol do Aprendizado Significativo |
| `2-sustentabilidade.png` | A Importância da Sustentabilidade e da Gestão de Riscos... |
| `3-projetos-praticos.png` | A Importância de Desenvolver Projetos Práticos para Divulgar a FIRST... |
| `4-marketing-identidade.png` | A Importância do Marketing e da Identidade Visual... |
| `5-parcerias.png` | Conexão e Aprendizado: o Papel das Parcerias... |

Se a imagem não existir, o cartão continua mostrando o ícone de documento.

## Como regenerar as capas

Na raiz do projeto, execute:

```bash
node scripts/generate-pdf-covers.js
```

Requer os PDFs em `public/indicacoes-docs/` e a dependência `pdf-to-png-converter` (`npm install`).

## Links dos PDFs (nomes curtos)

Os links na página usam `1.pdf`, `2.pdf`, … para evitar 404 no ambiente local (encoding/caminho). Para gerar essas cópias a partir dos PDFs com nome completo:

```bash
node scripts/link-pdf-short-names.js
```
