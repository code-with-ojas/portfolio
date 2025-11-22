// --- Contact Form Handling (Using FormSubmit) ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = e.target.querySelector('button');
        const span = btn.querySelector('span');
        const originalText = span.innerText;
        
        span.innerText = 'Sending...';
        btn.disabled = true;

        const formData = new FormData(contactForm);

        // Replace email below if needed
        fetch("https://formsubmit.co/ajax/abhinavanand9996@gmail.com", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
            span.innerText = originalText;
            btn.disabled = false;
        })
        .catch(error => {
            alert('Something went wrong. Please try again.');
            console.error('Error:', error);
            span.innerText = originalText;
            btn.disabled = false;
        });
    });
}

// --- Custom Cursor ---
(() => {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }
})();

// --- Typewriter Effect ---
(() => {
    const roles = ["Web Developer", "UI/UX Designer", "AI/ML Engineer", " Software Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    function typeWriter() {
        const element = document.getElementById('typewriter');
        if (!element) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            element.innerText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.innerText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeDelay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeDelay = pauseTime;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeDelay = 500;
        }

        setTimeout(typeWriter, typeDelay);
    }

    document.addEventListener('DOMContentLoaded', typeWriter);
})();

// --- Scroll Reveal Animation ---
(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
})();

// --- Mobile Menu Toggle ---
(() => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
})();

// --- Neural Network Canvas Animation (Updated Colors) ---
(() => {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let w, h, particles;
    const particleConfig = {
        amount: 50, // Reduced slightly for performance
        speed: 0.4,
        size: 2,
        connectionDistance: 150
    };

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * particleConfig.speed;
            this.vy = (Math.random() - 0.5) * particleConfig.speed;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }

        draw() {
            // Changed to Violet/Fuchsia
            ctx.fillStyle = '#a855f7'; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, particleConfig.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleConfig.amount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < particleConfig.connectionDistance) {
                    // Connecting lines opacity
                    ctx.strokeStyle = `rgba(168, 85, 247, ${1 - distance / particleConfig.connectionDistance})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

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