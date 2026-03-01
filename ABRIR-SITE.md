# Como Abrir e Testar o Site

## 🚀 Método Mais Rápido (Recomendado)

### Opção 1: Usar o Script Automático
1. **Clique duas vezes** no arquivo `abrir-site.bat`
2. O servidor será iniciado automaticamente
3. Abra seu navegador e acesse: **http://localhost:8000**
4. Para parar o servidor, pressione `Ctrl+C` no terminal

### Opção 2: Abrir Diretamente no Navegador
1. Abra o **Explorador de Arquivos**
2. Navegue até a pasta do projeto
3. **Clique duas vezes** no arquivo `index.html`
4. O site abrirá no seu navegador padrão

## 💻 Método Manual (Terminal)

### Usando Python:
```powershell
python -m http.server 8000
```
Depois acesse: http://localhost:8000

### Usando Node.js (se tiver instalado):
```powershell
npx serve
```

## 📱 Testar em Dispositivos Móveis

Se quiser testar no celular na mesma rede Wi-Fi:

1. Descubra o IP do seu computador:
   ```powershell
   ipconfig
   ```
   Procure por "IPv4 Address" (exemplo: 192.168.1.100)

2. No celular, acesse: `http://SEU_IP:8000`
   (Exemplo: http://192.168.1.100:8000)

## ✅ Verificações

- ✅ O site deve carregar completamente
- ✅ O menu deve funcionar (clique nos links)
- ✅ O menu mobile deve abrir/fechar (redimensione a janela)
- ✅ As animações devem aparecer ao rolar a página
- ✅ Todos os cards devem ter efeito hover

## 🔧 Formulário de contato e API (`/api/contacts`)

O botão **"Testar formulário"** e a página **/contatos-test** dependem da API serverless. Em servidores **apenas estáticos** (Python, `npx serve`, ou abrir `index.html` direto), a rota `/api/contacts` **não existe** e você verá **501 (Unsupported method)** ao enviar o formulário.

Para testar o formulário e a API localmente:

1. Instale as dependências: **`npm install`** (instala `@vercel/blob` e outras)
2. Instale o [Vercel CLI](https://vercel.com/cli): `npm i -g vercel`
3. Na pasta do projeto, crie `.env.local` com: `BLOB_READ_WRITE_TOKEN=seu_token`
4. Rode: **`vercel dev`**
5. Acesse o site na URL que o Vercel mostrar (ex.: http://localhost:3000)

No **deploy na Vercel**, a API funciona normalmente (configure `BLOB_READ_WRITE_TOKEN` nas variáveis de ambiente do projeto).

## 🐛 Problemas?

- **Python não encontrado**: Instale Python de python.org
- **Porta 8000 ocupada**: Use outra porta: `python -m http.server 8080`
- **CSS não carrega**: Certifique-se de que `styles.css` está na mesma pasta
- **501 no formulário**: Use `vercel dev` para rodar a API localmente (veja seção acima)
- **WebSocket localhost:8081**: Extensão ou ferramenta de live-reload; pode ignorar
- **Google Drive iframe bloqueado**: Política do Google; use o link "Abrir no Drive" abaixo do vídeo

