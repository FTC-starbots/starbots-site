/**
 * Sistema de Animações Tween para o site Starbots
 * Detecta elementos na viewport e aplica animações suaves
 */

class AnimationController {
    constructor() {
        // Configurações
        this.config = {
            threshold: 0.15, // Porcentagem do elemento visível para ativar
            rootMargin: '0px 0px -50px 0px', // Margem para ativar antes
            staggerDelay: 100, // Delay entre animações em cascata (ms)
        };

        // Elementos que serão animados automaticamente
        this.animatableSelectors = [
            '.section-title',
            '.section-description',
            '.temporada-card',
            '.material-card',
            '.modalidade-card',
            '.robo-card',
            '.projeto-card',
            '.premio-item',
            '.valores-list li',
            '.afonso-section',
            '.contato-section',
            '.contato-mentoria',
            '.first-content > p',
            '.text-content > p',
            '.mentorias-content > p',
            '.materiais-section',
            '.valores-first',
            '.fll-divisoes',
            '.premiacoes-modalidade',
            'footer.footer',
            '.animate-on-scroll',
            '.destaque-card',
            '.numero-card',
            '.valor-home-card',
            '.stat-card',
            '.modalidade-preview-card',
            '.resumo-card',
            '.impacto-card',
            '.passo-card',
            '.habilidade-card',
            '.parceiro-card',
            '.beneficio-card',
            '.timeline-item',
            '.awards-summary-card'
        ];

        this.observer = null;
        this.animatedElements = new Set();
    }

    /**
     * Inicializa o sistema de animações
     */
    init() {
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    /**
     * Configura o observer e as animações iniciais
     */
    setup() {
        // Pequeno delay para garantir que os componentes foram carregados
        setTimeout(() => {
            this.createObserver();
            this.observeElements();
            this.animatePageLoad();
        }, 100);
    }

    /**
     * Cria o Intersection Observer
     */
    createObserver() {
        const options = {
            root: null, // viewport
            rootMargin: this.config.rootMargin,
            threshold: this.config.threshold
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);
    }

    /**
     * Observa todos os elementos animáveis
     */
    observeElements() {
        this.animatableSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (!this.animatedElements.has(el)) {
                    this.observer.observe(el);
                }
            });
        });
    }

    /**
     * Anima um elemento individual
     */
    animateElement(element) {
        // Verifica se o elemento já está na viewport no carregamento
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            // Animação imediata com pequeno delay para suavizar
            requestAnimationFrame(() => {
                element.classList.add('animated');
            });
        } else {
            element.classList.add('animated');
        }
    }

    /**
     * Anima elementos em cascata (stagger)
     */
    animateStagger(elements, baseDelay = 0) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
                this.animatedElements.add(el);
            }, baseDelay + (index * this.config.staggerDelay));
        });
    }

    /**
     * Animações iniciais ao carregar a página
     */
    animatePageLoad() {
        // Anima o header
        const header = document.querySelector('.header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-20px)';
            header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        // Anima elementos que já estão visíveis na viewport
        setTimeout(() => {
            this.animateVisibleElements();
        }, 200);
    }

    /**
     * Anima elementos já visíveis na viewport
     */
    animateVisibleElements() {
        const windowHeight = window.innerHeight;
        
        this.animatableSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            const visibleElements = [];

            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < windowHeight * 0.8 && !this.animatedElements.has(el)) {
                    visibleElements.push(el);
                }
            });

            // Anima em cascata os elementos visíveis
            if (visibleElements.length > 0) {
                this.animateStagger(visibleElements, 0);
            }
        });
    }

    /**
     * Re-observa elementos (útil após carregar conteúdo dinâmico)
     */
    refresh() {
        this.observeElements();
    }

    /**
     * Para de observar um elemento específico
     */
    unobserve(element) {
        if (this.observer) {
            this.observer.unobserve(element);
        }
    }

    /**
     * Destrói o observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        this.animatedElements.clear();
    }
}

// Classe para animações de hover e interações
class InteractionAnimations {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupCardHovers();
        this.setupButtonRipples();
        this.setupNavHover();
    }

    /**
     * Animação de hover para cards
     */
    setupCardHovers() {
        const cards = document.querySelectorAll('.temporada-card, .material-card, .modalidade-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    /**
     * Efeito ripple para botões
     */
    setupButtonRipples() {
        const buttons = document.querySelectorAll('.cta-button, .patrocinar-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    /**
     * Animação de hover para navegação
     */
    setupNavHover() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        });
    }
}

// Classe para animação de contagem de números
class CountUpAnimation {
    constructor() {
        this.animatedNumbers = new Set();
        this.observer = null;
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        setTimeout(() => {
            this.createObserver();
            this.observeNumbers();
        }, 100);
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedNumbers.has(entry.target)) {
                    this.animateNumber(entry.target);
                    this.animatedNumbers.add(entry.target);
                }
            });
        }, options);
    }

    observeNumbers() {
        const numbers = document.querySelectorAll('[data-target]');
        numbers.forEach(el => {
            if (!this.animatedNumbers.has(el)) {
                this.observer.observe(el);
            }
        });
    }

    animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 segundos
        const startTime = performance.now();
        
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateNumber = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(easedProgress * target);
            
            element.textContent = currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target + suffix;
            }
        };

        requestAnimationFrame(updateNumber);
    }

    refresh() {
        this.observeNumbers();
    }
}

// Inicializa as animações
const animationController = new AnimationController();
const interactionAnimations = new InteractionAnimations();
const countUpAnimation = new CountUpAnimation();

animationController.init();
countUpAnimation.init();

// Exporta para uso global
window.AnimationController = animationController;
window.CountUpAnimation = countUpAnimation;

// Re-observa elementos quando componentes são carregados
document.addEventListener('componentsLoaded', () => {
    animationController.refresh();
    countUpAnimation.refresh();
});

