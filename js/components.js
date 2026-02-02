/**
 * Sistema de componentes modulares para o site Starbots
 * Carrega header, footer e seção de contato de arquivos externos
 */

class ComponentLoader {
    constructor() {
        this.componentsPath = '/components';
        this.cache = {};
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
            const response = await fetch(`${this.componentsPath}/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Erro ao carregar componente: ${componentName}`);
            }
            const html = await response.text();
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

        // Reinicializa o menu mobile após carregar o header
        this.initMobileMenu();
        
        // Marca o link ativo no menu
        this.setActiveNavLink();

        // Dispara evento para indicar que componentes foram carregados
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }

    /**
     * Inicializa o menu mobile
     */
    initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
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

