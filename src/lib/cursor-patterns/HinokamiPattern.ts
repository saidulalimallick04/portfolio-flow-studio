import { BreathingPattern } from './types';

class Point {
    x: number;
    y: number;
    lifetime: number;
    initialLifetime: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.initialLifetime = 20; // How long trail segments last
        this.lifetime = this.initialLifetime;
    }

    update() {
        this.lifetime--;
    }
}

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    color: string;
    life: number;

    constructor(x: number, y: number, colors: any) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 1; // Slight upward drift
        this.size = Math.random() * 3 + 1;
        this.alpha = 1;
        this.life = Math.random() * 30 + 20;
        this.color = colors.ember[Math.floor(Math.random() * colors.ember.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.alpha = this.life / 50;
        this.size *= 0.95; // Shrink over time
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

export class HinokamiPattern implements BreathingPattern {
    private trail: Point[] = [];
    private particles: Particle[] = [];
    private lastMousePos: { x: number, y: number } | null = null;
    private colors: any;

    private themeColors = {
        dark: {
            core: '#FFFFFF', // Hot center
            inner: '#FFD700', // Gold/Yellow
            middle: '#FF4500', // OrangeRed
            outer: '#8B0000', // DarkRed
            ember: ['#FFD700', '#FF4500', '#FF6347'] // Gold, OrangeRed, Tomato
        },
        light: {
            core: '#FFFACD', // LemonChiffon
            inner: '#FF8C00', // DarkOrange
            middle: '#DC143C', // Crimson
            outer: '#800000', // Maroon
            ember: ['#FF8C00', '#DC143C', '#B22222'] // Orange, Crimson, FireBrick
        }
    };

    init(canvas: HTMLCanvasElement) { }

    resize(width: number, height: number) { }

    updateTheme(isDarkMode: boolean) {
        this.colors = isDarkMode ? this.themeColors.dark : this.themeColors.light;
    }

    handleMouseMove(e: MouseEvent) {
        // Add trail point
        this.trail.push(new Point(e.clientX, e.clientY));

        // Add particles based on movement speed
        if (this.lastMousePos) {
            const dx = e.clientX - this.lastMousePos.x;
            const dy = e.clientY - this.lastMousePos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // More particles for faster movement
            const particleCount = Math.min(5, Math.floor(distance / 5));
            for (let i = 0; i < particleCount; i++) {
                this.particles.push(new Particle(
                    e.clientX + (Math.random() - 0.5) * 10,
                    e.clientY + (Math.random() - 0.5) * 10,
                    this.colors
                ));
            }
        }
        this.lastMousePos = { x: e.clientX, y: e.clientY };
    }

    update(ctx: CanvasRenderingContext2D) {
        if (!this.colors) return;

        // Draw Trail as a smooth curve
        if (this.trail.length > 1) {
            ctx.save();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Outer glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.colors.outer;

            for (let i = 0; i < this.trail.length - 1; i++) {
                const p1 = this.trail[i];
                const p2 = this.trail[i + 1];

                const progress = i / this.trail.length; // 0 (tail) to 1 (head)
                const width = progress * 15; // Thinner tail, thicker head

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);

                // Gradient based on position in trail
                if (progress > 0.8) ctx.strokeStyle = this.colors.core;
                else if (progress > 0.5) ctx.strokeStyle = this.colors.inner;
                else if (progress > 0.2) ctx.strokeStyle = this.colors.middle;
                else ctx.strokeStyle = this.colors.outer;

                ctx.lineWidth = width;
                ctx.globalAlpha = progress; // Fade out tail
                ctx.stroke();
            }
            ctx.restore();
        }

        // Update and Prune Trail
        for (let i = this.trail.length - 1; i >= 0; i--) {
            this.trail[i].update();
            if (this.trail[i].lifetime <= 0) {
                this.trail.splice(i, 1);
            }
        }

        // Update and Draw Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].draw(ctx);
            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    destroy() {
        this.trail = [];
        this.particles = [];
    }
}
