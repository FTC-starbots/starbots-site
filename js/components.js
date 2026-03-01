/**
 * Sistema de componentes modulares para o site Starbots
 * Carrega header, footer e seção de contato de arquivos externos
 */

class ComponentLoader {
    constructor() {
        this.componentsPath = this.getBasePath() + 'components';
        this.cache = {};
    }

    /**
     * Retorna o caminho base do site (funciona em subpastas, ex: GitHub Pages)
     */
    getBasePath() {
        const path = window.location.pathname;
        const base = path.endsWith('/') ? path : path.replace(/\/[^/]*$/, '/');
        return base || '/';
    }

    /**
     * Carrega um componente HTML de um arquivo
     * @param {string} componentName - Nome do componente (ex: 'header', 'footer')
     * @returns {Promise<string>} - HTML do componente
     */
    async loadComponent(componentName) {
        if (this.cache[componentName]) {
            return this.cache[componentName];
        }

        try {
            const url = `${this.componentsPath}/${componentName}.html`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao carregar componente: ${componentName}`);
            }
            let html = await response.text();
            const base = this.getBasePath();
            if (base !== '/') {
                html = html.replace(/href="\//g, 'href="' + base);
                html = html.replace(/src="public\//g, 'src="' + base + 'public/');
            }
            this.cache[componentName] = html;
            return html;
        } catch (error) {
            console.error(`Erro ao carregar ${componentName}:`, error);
            return '';
        }
    }

    /**
     * Injeta um componente em um elemento placeholder
     * @param {string} componentName - Nome do componente
     * @param {string} placeholderId - ID do elemento placeholder
     */
    async injectComponent(componentName, placeholderId) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.warn(`Placeholder não encontrado: ${placeholderId}`);
            return;
        }

        const html = await this.loadComponent(componentName);
        placeholder.outerHTML = html;
    }

    /**
     * Inicializa todos os componentes da página
     */
    async init() {
        // Carrega componentes em paralelo para melhor performance
        await Promise.all([
            this.injectComponent('header', 'header-placeholder'),
            this.injectComponent('footer', 'footer-placeholder'),
            this.injectComponent('contato', 'contato-placeholder')
        ]);

        // Menu mobile e efeitos do header são inicializados em script.js (evento componentsLoaded)

        // Marca o link ativo no menu
        this.setActiveNavLink();

        // Dispara evento para indicar que componentes foram carregados
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }

    /**
     * Marca o link ativo no menu de navegação
     */
    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath === href || 
                (currentPath === '/' && href === '/') ||
                (currentPath.endsWith('.html') && href === currentPath)) {
                link.classList.add('active');
            }
        });
    }
}

// Inicializa o carregador de componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.init();
});

