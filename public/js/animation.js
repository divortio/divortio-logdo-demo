// This file contains the animation logic for the Divortio landing page.
// It is referenced by index.html and branding.html.

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    // If there's no canvas on the page, do nothing.
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const logo = document.getElementById('hero-logo');
    const letters = logo ? logo.querySelectorAll('span') : [];
    const siteHeader = document.getElementById('site-header');

    let particles = [];
    const FOG_SPEED_MULTIPLIER = 5.0;
    const numParticles = 20;

    // --- Pre-rendering Canvas for Fog Particle ---
    // This improves performance by drawing the complex gradient once.
    const fogParticleCanvas = document.createElement('canvas');
    const fogParticleCtx = fogParticleCanvas.getContext('2d');
    const fogRadius = 400; // Master radius for our particle
    fogParticleCanvas.width = fogRadius * 2;
    fogParticleCanvas.height = fogRadius * 2;

    const gradient = fogParticleCtx.createRadialGradient(fogRadius, fogRadius, fogRadius * 0.5, fogRadius, fogRadius, fogRadius);
    gradient.addColorStop(0, 'rgba(100, 120, 150, 0.15)');
    gradient.addColorStop(1, 'rgba(100, 120, 150, 0)');
    fogParticleCtx.fillStyle = gradient;
    fogParticleCtx.beginPath();
    fogParticleCtx.arc(fogRadius, fogRadius, fogRadius, 0, Math.PI * 2);
    fogParticleCtx.fill();

    // --- End of Pre-rendering ---

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);

    class FogParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * FOG_SPEED_MULTIPLIER;
            this.vy = (Math.random() - 0.5) * FOG_SPEED_MULTIPLIER;
            this.scale = (Math.random() * 0.5 + 0.75); // Each particle can have a slightly different size
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            const radius = fogRadius * this.scale;
            if (this.x + radius < 0) this.x = canvas.width + radius;
            if (this.x - radius > canvas.width) this.x = -radius;
            if (this.y + radius < 0) this.y = canvas.height + radius;
            if (this.y - radius > canvas.height) this.y = -radius;
        }

        draw() {
            const radius = fogRadius * this.scale;
            // Draw the pre-rendered fog particle instead of creating a new gradient
            ctx.drawImage(fogParticleCanvas, this.x - radius, this.y - radius, radius * 2, radius * 2);
        }
    }

    function init() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new FogParticle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (letters.length > 0) {
            const cycleDuration = 7500;
            const sweepDuration = 5000;
            const time = Date.now() % cycleDuration;
            let progress = -1;
            if (time < sweepDuration) {
                progress = time / sweepDuration;
            }
            const beamWidth = 1.5;

            letters.forEach((letter, i) => {
                const letterProgress = i / (letters.length - 1);
                let dist = Math.abs(progress - letterProgress);

                const intensity = Math.pow(Math.max(0, 1 - dist / (beamWidth / letters.length)), 4);

                const glowRadius = intensity * 60;
                const glowOpacity = intensity * 0.9;
                const colorOpacity = 0.8 + intensity * 0.2;
                const brightColor = `rgba(255, 223, 105, ${glowOpacity})`;

                if (intensity > 0.01) {
                    letter.style.textShadow = `0 0 10px rgba(0,0,0,0.5), 0 0 12px ${brightColor}, 0 0 ${glowRadius}px ${brightColor}`;
                } else {
                    letter.style.textShadow = `0 0 10px rgba(0,0,0,0.5)`;
                }
                letter.style.color = `rgba(255, 255, 255, ${colorOpacity})`;
            });
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }

    init();
    animate();
});
