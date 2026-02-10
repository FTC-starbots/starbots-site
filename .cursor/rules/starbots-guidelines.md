---
description: "Diretrizes gerais para desenvolvimento e manutenção do site Starbots FTC, incluindo design system, acessibilidade e estrutura"
alwaysApply: true
---

# Diretrizes Starbots FTC - Site Institucional

## Visão Geral

Este é o site institucional da equipe **STARBOTS FTC #16055** da Escola SESI Betim-MG. O site promove a equipe de robótica, democratiza o acesso à robótica e representa a FIRST® de forma acessível e inclusiva.

**Fonte de Verdade**: Todo conteúdo textual deve ser alinhado com o **Notion oficial** da equipe. O Notion é a base oficial de referência para textos, informações e recursos.

## Paleta de Cores Oficial

A paleta de cores é um elemento fundamental da identidade visual. **SEMPRE** use estas cores quando trabalhar com elementos visuais:

### Cores Principais
- **Roxo Escuro**: `#2D0147` - Use para backgrounds escuros, textos em fundos claros
- **Roxo**: `#600098` - Cor principal da marca, use para elementos de destaque
- **Laranja Intenso**: `#FF3500` - Cor de acento principal, CTAs, hover states
- **Laranja**: `#FF5C00` - Cor de acento secundário, elementos complementares

### Uso das Cores
- Priorize o roxo (`#600098`) para elementos principais da marca
- Use laranja intenso (`#FF3500`) para botões, links importantes e estados de hover
- O roxo escuro (`#2D0147`) funciona bem para headers, footers e seções com fundo escuro
- O laranja (`#FF5C00`) pode ser usado como variação mais suave do laranja intenso

### Variáveis CSS
Atualize as variáveis CSS em `styles.css` para refletir a paleta oficial:
```css
:root {
    --purple-dark: #2D0147;
    --purple: #600098;
    --orange-intense: #FF3500;
    --orange: #FF5C00;
    /* Mantenha cores auxiliares para texto, backgrounds neutros, etc */
}
```

## Estrutura do Projeto

### Arquivos Principais
- `index.html` - Página inicial (Quem Somos)
- `premiacoes-robos.html` - Premiações e Robôs
- `sobre-first.html` - Sobre a FIRST®
- `mentorias.html` - Mentorias
- `patrocinio.html` - Patrocínio
- `styles.css` - Estilos globais
- `script.js` - JavaScript para interatividade
- `server.py` - Servidor local de desenvolvimento

### Estrutura de Pastas
```
public/
  ├── images/     # Imagens do site (afonso.webp, equipe-starbots.webp, logo)
  └── fonts/      # Fonte customizada (Nasalization Rg.otf)
```

### Recursos Gráficos

**Logo Oficial**: Localizado em `public/images/starbots logo.png` - Use como referência para manter consistência visual.

**Fontes Utilizadas**:
- **Nasalization**: Fonte customizada para logo e títulos principais (arquivo: `public/fonts/Nasalization Rg.otf`)
- **Inter**: Fonte do Google Fonts para textos gerais (já importada no HTML)

## Acessibilidade - Prioridade Máxima

O site foi criado com foco em inclusão. **SEMPRE** considere acessibilidade em todas as modificações:

### Recursos de Acessibilidade Implementados/Futuros

1. **Gravações de Áudio**
   - Todos os textos do site devem ter gravações de áudio correspondentes
   - As gravações são feitas com base exatamente no conteúdo do Notion
   - **IMPORTANTE**: Alinhe o site com o Notion antes de gravar, para evitar retrabalho

2. **Linguagem de Sinais (Libras)**
   - Gravações em Libras para os conteúdos principais
   - Considere espaço visual adequado para exibir vídeos de Libras

3. **Estrutura HTML Semântica**
   - Use tags semânticas apropriadas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
   - Mantenha hierarquia de headings correta (`h1` → `h2` → `h3`)
   - Adicione `alt` descritivo em todas as imagens
   - Use `aria-label` em elementos interativos sem texto visível

4. **Contraste e Legibilidade**
   - Garanta contraste adequado entre texto e fundo (WCAG AA mínimo)
   - Use tamanhos de fonte legíveis (mínimo 16px para texto corrido)
   - Mantenha espaçamento adequado entre linhas

5. **Navegação por Teclado**
   - Todos os elementos interativos devem ser acessíveis via teclado
   - Indique visualmente o foco (outline ou border)
   - Mantenha ordem lógica de tabulação

### Implementação de Áudio e Vídeo

Quando adicionar suporte a áudio/vídeo:
- Use elementos `<audio>` e `<video>` com controles acessíveis
- Forneça transcrições para conteúdo de áudio
- Adicione legendas para vídeos
- Considere um player customizado com controles grandes e claros

## Conteúdos e Textos

### Fonte de Verdade: Notion

- **TODOS** os textos devem ser alinhados com o Notion oficial
- Antes de fazer alterações de conteúdo, verifique o Notion
- Se houver divergência, o Notion tem precedência
- Após atualizar textos no site, valide com o cliente antes de gravar áudios/Libras

### Conteúdos a Implementar

1. **Desafio da Temporada FRC**
   - Adicionar texto sobre o desafio da temporada atual da FRC
   - Consultar Notion para conteúdo oficial

2. **Aba Indicações** (Nova página)
   - Cursos recomendados
   - E-books recomendados
   - Posteriormente: gravações em áudio com leitura dos e-books
   - Estrutura similar às outras páginas do site

3. **Seção de Parceiros**
   - Listar todos os parceiros (informações no Notion)
   - Exibir logos quando disponíveis
   - Manter design consistente com o restante do site

## Formulários

### Formulários a Implementar

1. **Formulário de Interesse em Mentorias**
   - Para equipes interessadas em receber mentorias
   - Link/formulário na página de Mentorias

2. **Formulário de Interesse em Patrocínio/Parcerias**
   - Para empresas interessadas em patrocinar ou fazer parcerias
   - Link/formulário na página de Patrocínio

### Considerações para Formulários
- Use campos semânticos e labels claros
- Adicione validação client-side e server-side
- Forneça feedback claro de sucesso/erro
- Considere acessibilidade (ARIA labels, mensagens de erro associadas)

## Estrutura e Design

### Header/Navegação

- Header fixo no topo com efeito de blur/transparência
- Menu responsivo com toggle mobile
- Logo "STARBOTS" usando fonte Nasalization
- Links de navegação principais:
  - Quem somos (index.html)
  - Premiações e Robôs
  - Sobre a FIRST®
  - Mentorias
  - Patrocínio
  - Indicações (a adicionar)

**Nota**: Ajustes na estrutura do header estão em alinhamento interno com a Lívia - consulte antes de fazer mudanças significativas.

### Padrões de Layout

- Use `.container` para limitar largura máxima (1200px) e centralizar conteúdo
- Seções alternam entre `background: var(--secondary-color)` e `background: var(--bg-light)`
- Títulos de seção usam `.section-title` (2.5rem, centralizado, bold)
- Espaçamento padrão: `padding: 5rem 0` para seções principais

### Cards e Componentes

- Cards usam `border-radius: 15px`
- Efeito hover: `transform: translateY(-10px)` com sombra aumentada
- Transições suaves: `transition: all 0.3s ease`
- Bordas de destaque: `border-left: 4px solid var(--accent-orange)`

### Responsividade

- Mobile-first approach
- Breakpoints principais:
  - Mobile: até 480px
  - Tablet: 481px - 768px
  - Desktop: acima de 768px
- Menu mobile com toggle hamburger
- Grids adaptam para 1 coluna em mobile

## Internacionalização (i18n)

### Preparação para Tradução

O site será traduzido para inglês no futuro. Ao estruturar o código:

1. **Separe Conteúdo de Estrutura**
   - Evite texto hardcoded diretamente no HTML quando possível
   - Considere usar atributos `data-*` para textos que serão traduzidos
   - Mantenha estrutura HTML consistente para facilitar tradução

2. **Atributos de Idioma**
   - Use `lang="pt-BR"` no `<html>` (já implementado)
   - Quando adicionar versão em inglês, use `lang="en"` na versão correspondente

3. **Gravações Futuras**
   - Gravações de áudio e Libras também serão feitas em inglês
   - Estruture o código para suportar múltiplos idiomas facilmente

4. **Estrutura Sugerida para i18n**
   - Considere criar um objeto JavaScript com textos traduzíveis
   - Ou use um sistema de templates que facilite troca de idioma
   - Mantenha imagens e assets que não dependem de idioma separados

## Padrões de Código

### HTML
- Use HTML5 semântico
- Indentação: 4 espaços
- Atributos em ordem: `class`, `id`, `src`, `alt`, `href`, `aria-*`
- Feche todas as tags apropriadamente

### CSS
- Use variáveis CSS para cores e valores reutilizáveis
- Organize por seções (Header, Hero, Sections, Footer, etc.)
- Use nomes de classes descritivos e em inglês
- Mantenha especificidade baixa quando possível
- Use flexbox/grid para layouts

### JavaScript
- Vanilla JavaScript (sem frameworks)
- Use `const` e `let`, evite `var`
- Funções devem ter nomes descritivos
- Comente código complexo
- Mantenha código modular e reutilizável

### Nomenclatura
- Classes CSS: kebab-case (`.hero-section`, `.nav-menu`)
- IDs: kebab-case (`#sobre`, `#contato`)
- Variáveis JavaScript: camelCase (`mobileMenuToggle`, `navMenu`)
- Arquivos: kebab-case (`premiacoes-robos.html`)

## Processo de Trabalho

### Validação com Cliente

1. **Antes de Implementar**
   - Verifique o Notion para conteúdo oficial
   - Confirme requisitos se houver dúvidas

2. **Após Implementar**
   - **SEMPRE** apresente mudanças para validação do cliente antes de avançar
   - Especialmente importante antes de gravar áudios/Libras
   - Alinhamento rápido é crucial para evitar retrabalho

3. **Alinhamento com Notion**
   - O site deve refletir fielmente o Notion
   - Se houver divergência, Notion tem precedência
   - Atualize o site primeiro, depois grave conteúdos de acessibilidade

### Checklist de Modificações

Ao fazer modificações no site, verifique:
- [ ] Conteúdo alinhado com Notion
- [ ] Paleta de cores respeitada
- [ ] Acessibilidade considerada (semântica, ARIA, contraste)
- [ ] Responsividade testada
- [ ] Estrutura HTML semântica mantida
- [ ] Código limpo e organizado
- [ ] Validação com cliente antes de gravar áudios/Libras

## Recursos e Referências

### Arquivos de Referência
- `index.html` - Estrutura base e padrões de HTML
- `styles.css` - Sistema de design e estilos
- `script.js` - Padrões de interatividade

### Imagens Importantes
- Logo: `public/images/starbots logo.png`
- Mascote: `public/images/afonso.webp`
- Hero: `public/images/equipe-starbots.webp`

### Fontes
- Nasalization: `public/fonts/Nasalization Rg.otf` (para logo e títulos)
- Inter: Google Fonts (para textos gerais)

## Notas Importantes

- **Flexibilidade**: Estas diretrizes são orientações, não regras rígidas. Use bom senso e priorize a experiência do usuário e acessibilidade.
- **Evolução**: O site está em constante evolução. Mantenha estas diretrizes atualizadas conforme o projeto cresce.
- **Prioridades**: Acessibilidade e alinhamento com Notion são prioridades máximas.
- **Comunicação**: Em caso de dúvidas sobre requisitos específicos, consulte o cliente antes de implementar.









