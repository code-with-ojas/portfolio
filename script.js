// =================== CONTACT FORM (FormSubmit) ===================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const btn = e.target.querySelector('button');
        const span = btn.querySelector('span');
        const originalHTML = span.innerHTML;
        
        span.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        fetch("https://formsubmit.co/ajax/abhinavanand9996@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(() => {
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
            span.innerHTML = originalHTML;
            btn.disabled = false;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
            span.innerHTML = originalHTML;
            btn.disabled = false;
        });
    });
}

// =================== CUSTOM CURSOR ===================
(() => {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;

        cursorOutline.animate(
            { left: `${x - 15}px`, top: `${y - 15}px` },
            { duration: 260, fill: "forwards" }
        );
    });

    window.addEventListener('mousedown', () => {
        cursorOutline.style.transform = 'scale(0.8)';
    });
    window.addEventListener('mouseup', () => {
        cursorOutline.style.transform = 'scale(1)';
    });
})();

// =================== TYPEWRITER EFFECT ===================
(() => {
    const roles = [
        "Web Developer",
        "UI/UX Designer",
        "AI/ML Engineer",
        "Software Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 90;
    const deleteSpeed = 45;
    const pauseTime = 1800;

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
            isDeleting = true;
            delay = pauseTime;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 500;
        }

        setTimeout(typeWriter, delay);
    }

    document.addEventListener('DOMContentLoaded', typeWriter);
})();

// =================== SCROLL REVEAL ===================
(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const visibleOffset = 120;

        revealElements.forEach((el) => {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - visibleOffset) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
})();

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

// =================== NEURAL NETWORK CANVAS ===================
(() => {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const config = {
        amount: 55,
        speed: 0.45,
        size: 2,
        connectionDistance: 150
    };

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * config.speed;
            this.vy = (Math.random() - 0.5) * config.speed;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
                this.reset();
            }
        }
        draw() {
            ctx.fillStyle = '#a855f7';
            ctx.beginPath();
            ctx.arc(this.x, this.y, config.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < config.amount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    const alpha = 1 - distance / config.connectionDistance;
                    ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.9})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    resize();
    initParticles();
    animate();
})();

// =================== SCROLL PROGRESS + NAVBAR STATE ===================
(() => {
    const progressBar = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        if (navbar) {
            if (scrollTop > 40) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
})();

// =================== PROJECT FILTERING ===================
(() => {
    const buttons = document.querySelectorAll('.project-filter');
    const cards = document.querySelectorAll('.project-card');

    if (!buttons.length || !cards.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                if (filter === 'all' || category.includes(filter)) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.pointerEvents = 'auto';
                } else {
                    card.style.opacity = '0.15';
                    card.style.transform = 'translateY(6px)';
                    card.style.pointerEvents = 'none';
                }
            });
        });
    });
})();

// =================== CARD TILT EFFECT ===================
(() => {
    const tiltCards = document.querySelectorAll('.card-tilt');

    if (!tiltCards.length) return;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = (y / rect.height) * -8;
            const rotateY = (x / rect.width) * 8;

            card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.boxShadow = `0 24px 60px rgba(15, 23, 42, 0.9)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
            card.style.boxShadow = '';
        });
    });
})();
