# Starbots - Website

Site institucional do time de robótica Starbots, inspirado no design do site oficial.

## Estrutura do Projeto

```
starbots/
├── index.html      # Estrutura HTML principal
├── styles.css      # Estilos e design responsivo
├── script.js       # Interatividade e animações
└── README.md       # Documentação
```

## Características

- **Design Moderno**: Interface limpa e profissional
- **Totalmente Responsivo**: Adaptável a todos os dispositivos
- **Animações Suaves**: Transições e efeitos visuais
- **Navegação Intuitiva**: Menu fixo com scroll suave
- **Seções Completas**: 
  - Hero com badges de conquistas
  - Seção de troféus e competições
  - Galeria de robôs
  - Projetos do time
  - Patrocinadores
  - Footer com informações de contato

## Como Usar

1. Abra o arquivo `index.html` em um navegador moderno
2. Ou use um servidor local:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

## Personalização

### Adicionar Imagens Reais

Substitua os placeholders de imagem pelos arquivos reais:
- Robôs: Adicione as imagens na seção `.robo-image`
- Projetos: Adicione as imagens na seção `.projeto-image`
- Logo: Adicione o logo na seção `.footer-logo`

### Cores

As cores podem ser personalizadas no arquivo `styles.css` através das variáveis CSS:
- `--primary-color`: Cor principal
- `--accent-color`: Cor de destaque
- `--text-color`: Cor do texto

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e Grid/Flexbox)
- JavaScript (Vanilla)
- Google Fonts (Inter)

## Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos móveis (iOS, Android)
- Tablets e desktops

## Licença

©2025 Starbots - 16055 | O Time de Robótica do Brasil. All Rights Reserved.

