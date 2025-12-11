// =================== PRELOADER ===================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        }, 800);
    }
});

// =================== SPOTLIGHT EFFECT ===================
const spotlightCards = document.querySelectorAll('.spotlight-card');
spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// =================== TYPEWRITER EFFECT ===================
(() => {
    const roles = ["Web Developer", "UI/UX Designer", "AI/ML Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 2000;

    function typeWriter() {
        const element = document.getElementById('typewriter');
        if (!element) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true; delay = pauseTime;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 500;
        }
        setTimeout(typeWriter, delay);
    }
    document.addEventListener('DOMContentLoaded', typeWriter);
})();

// =================== NEURAL PARTICLES ===================
(() => {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const config = { amount: 60, speed: 0.35, size: 2, connectionDistance: 140 };

    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * w; this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * config.speed; this.vy = (Math.random() - 0.5) * config.speed;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
        }
        draw() {
            // Warm Orange Particles
            ctx.fillStyle = '#f97316'; 
            ctx.beginPath(); ctx.arc(this.x, this.y, config.size, 0, Math.PI * 2); ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < config.amount; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i]; const p2 = particles[j];
                const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                if (distance < config.connectionDistance) {
                    const alpha = 1 - distance / config.connectionDistance;
                    // Pink/Purple Connections
                    ctx.strokeStyle = `rgba(236, 72, 153, ${alpha * 0.6})`;
                    ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', () => { resize(); initParticles(); });
    resize(); initParticles(); animate();
})();

// =================== CUSTOM CURSOR ===================
(() => {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    if (!dot || !outline) return;

    window.addEventListener('mousemove', (e) => {
        const x = e.clientX; const y = e.clientY;
        dot.style.left = `${x}px`; dot.style.top = `${y}px`;
        outline.animate({ left: `${x - 16}px`, top: `${y - 16}px` }, { duration: 200, fill: "forwards" });
    });
})();

// =================== SCROLL REVEAL & NAV ===================
(() => {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');
    const reveals = document.querySelectorAll('.reveal');

    function update() {
        const scrollY = window.scrollY;
        
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = `${(scrollY / maxScroll) * 100}%`;

        scrollY > 50 ? navbar.classList.add('nav-scrolled') : navbar.classList.remove('nav-scrolled');

        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < triggerBottom) el.classList.add('active');
        });
    }
    window.addEventListener('scroll', update);
    update();
})();

// =================== PROJECT FILTER ===================
document.querySelectorAll('.project-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.project-filter.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        
        document.querySelectorAll('.project-card').forEach(card => {
            const match = filter === 'all' || card.dataset.category.includes(filter);
            card.style.opacity = match ? '1' : '0.1';
            card.style.transform = match ? 'scale(1)' : 'scale(0.95)';
            card.style.pointerEvents = match ? 'all' : 'none';
        });
    });
});

// =================== MOBILE MENU ===================
(() => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
})();

// =================== CONTACT FORM ===================
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('Message sent! I will contact you shortly.');
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 1500);
    });
}