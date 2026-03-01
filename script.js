function initMobileMenuAndHeader() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!mobileMenuToggle || !navMenu || mobileMenuToggle.dataset.initialized === '1') return;
    mobileMenuToggle.dataset.initialized = '1';

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header || header.dataset.scrollInit === '1') return;
    header.dataset.scrollInit = '1';
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        header.style.boxShadow = currentScroll > 100
            ? '0 4px 20px rgba(0, 0, 0, 0.15)'
            : '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenuAndHeader();
    initHeaderScrollEffect();
});
function initTestFormModal() {
    const btn = document.getElementById('btn-testar-formulario');
    const modal = document.getElementById('modal-form-contato');
    const closeBtn = document.getElementById('modal-form-close');
    const cancelBtn = document.getElementById('modal-form-cancel');
    const form = document.getElementById('form-contato-test');
    const statusEl = document.getElementById('modal-form-status');
    if (!btn || !modal || !form) return;

    // Modal dentro do header herda o containing block do fixed (backdrop-filter). Move para body para centralizar na viewport.
    if (modal.parentNode !== document.body) {
        document.body.appendChild(modal);
    }

    function openModal() {
        modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        statusEl.textContent = '';
        statusEl.className = 'modal-form-status';
    }
    function closeModal() {
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', openModal);
    closeBtn && closeBtn.addEventListener('click', closeModal);
    cancelBtn && cancelBtn.addEventListener('click', closeModal);
    modal.querySelector('.modal-form-backdrop').addEventListener('click', closeModal);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        statusEl.textContent = 'Enviando...';
        statusEl.className = 'modal-form-status';
        const payload = {
            nome: form.nome.value.trim(),
            email: form.email.value.trim(),
            mensagem: (form.mensagem && form.mensagem.value) ? form.mensagem.value.trim() : ''
        };
        try {
            const res = await fetch('/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                statusEl.innerHTML = 'Salvo com sucesso! <a href="/contatos-test">Ver lista de contatos</a>';
                statusEl.className = 'modal-form-status success';
                form.reset();
                setTimeout(closeModal, 2500);
            } else {
                statusEl.textContent = data.error || 'Erro ao salvar. Tente de novo.';
                statusEl.className = 'modal-form-status error';
            }
        } catch (err) {
            statusEl.textContent = 'Erro de rede. Verifique se a API está disponível.';
            statusEl.className = 'modal-form-status error';
        }
    });
}

document.addEventListener('componentsLoaded', () => {
    initMobileMenuAndHeader();
    initHeaderScrollEffect();
    initTestFormModal();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.robo-card, .projeto-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Add hover effect to badges
const badges = document.querySelectorAll('.badge');
badges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect to project cards
const projectCards = document.querySelectorAll('.projeto-card');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading: só troca src por data-src em imagens que tenham data-src (evita apagar imagens que já têm src)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"][data-src]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
}

// Equipes Cards Toggle
const equipeCards = document.querySelectorAll('.equipe-card');
const equipeDetails = document.querySelectorAll('.equipe-details');

equipeCards.forEach(card => {
    card.addEventListener('click', function() {
        const equipeId = this.getAttribute('data-equipe');
        
        // Remove active class from all cards
        equipeCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked card
        this.classList.add('active');
        
        // Hide all content
        equipeDetails.forEach(detail => detail.classList.remove('active'));
        
        // Show selected content
        const selectedContent = document.getElementById(`${equipeId}-content`);
        if (selectedContent) {
            selectedContent.classList.add('active');
            
            // Smooth scroll to content
            setTimeout(() => {
                selectedContent.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        }
    });
});

console.log('Starbots - Site carregado com sucesso!');

