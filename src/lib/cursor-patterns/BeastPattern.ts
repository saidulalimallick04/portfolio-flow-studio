import { BreathingPattern } from './types';

class Point {
    x: number;
    y: number;
    lifetime: number;
    initialLifetime: number;
    offset: number;

    constructor(x: number, y: number, offset: number) {
        this.x = x;
        this.y = y;
        this.initialLifetime = 15; // Shorter lifetime for fast, aggressive feel
        this.lifetime = this.initialLifetime;
        this.offset = offset;
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
    rotation: number;
    rotationSpeed: number;
    alpha: number;
    color: string;
    life: number;

    constructor(x: number, y: number, colors: any) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1; // Fast, explosive
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 4 + 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
        this.alpha = 1;
        this.life = Math.random() * 20 + 10;
        this.color = colors.debris[Math.floor(Math.random() * colors.debris.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.life--;
        this.alpha = this.life / 30;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        // Draw distinct "chip" or triangle shape
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(this.size, this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

export class BeastPattern implements BreathingPattern {
    private leftTrail: Point[] = [];
    private rightTrail: Point[] = [];
    private particles: Particle[] = [];
    private lastMousePos: { x: number, y: number } | null = null;
    private colors: any;

    private themeColors = {
        dark: {
            blade1: '#4B0082', // Indigo
            blade2: '#0000FF', // Blue
            core: '#E6E6FA',   // Lavender
            debris: ['#708090', '#778899', '#B0C4DE'] // Slates and Steel Blues
        },
        light: {
            blade1: '#008B8B', // DarkCyan
            blade2: '#4682B4', // SteelBlue
            core: '#F0F8FF',   // AliceBlue
            debris: ['#2F4F4F', '#5F9EA0', '#87CEEB'] // DarkSlates and SkyBlues
        }
    };

    init(canvas: HTMLCanvasElement) { }

    resize(width: number, height: number) { }

    updateTheme(isDarkMode: boolean) {
        this.colors = isDarkMode ? this.themeColors.dark : this.themeColors.light;
    }

    handleMouseMove(e: MouseEvent) {
        // Create two offset points for dual blades
        // We calculate a perpendicular vector to the movement direction to offset left/right
        let offsetX = 0;
        let offsetY = 0;

        if (this.lastMousePos) {
            const dx = e.clientX - this.lastMousePos.x;
            const dy = e.clientY - this.lastMousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 0) {
                // Perpendicular vector (-y, x) normalized * offsetAmount
                const offsetAmount = 8;
                offsetX = (-dy / dist) * offsetAmount;
                offsetY = (dx / dist) * offsetAmount;
            }

            // Add debris
            const particleCount = Math.min(3, Math.floor(dist / 10));
            for (let i = 0; i < particleCount; i++) {
                this.particles.push(new Particle(e.clientX, e.clientY, this.colors));
            }
        }

        // Add points to left/right trails with visual "jitter" for saw-tooth effect
        const jitter = 2;
        this.leftTrail.push(new Point(
            e.clientX - offsetX + (Math.random() - 0.5) * jitter,
            e.clientY - offsetY + (Math.random() - 0.5) * jitter, -1
        ));
        this.rightTrail.push(new Point(
            e.clientX + offsetX + (Math.random() - 0.5) * jitter,
            e.clientY + offsetY + (Math.random() - 0.5) * jitter, 1
        ));

        this.lastMousePos = { x: e.clientX, y: e.clientY };
    }

    private drawJaggedTrail(ctx: CanvasRenderingContext2D, trail: Point[], color: string) {
        if (trail.length < 2) return;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(trail[0].x, trail[0].y);

        for (let i = 1; i < trail.length; i++) {
            // Use lineTo for sharp angles
            ctx.lineTo(trail[i].x, trail[i].y);
        }

        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 5;
        ctx.lineJoin = 'miter'; // Miter for sharp corners
        ctx.stroke();
        ctx.restore();
    }

    update(ctx: CanvasRenderingContext2D) {
        if (!this.colors) return;

        // Draw Trails
        this.drawJaggedTrail(ctx, this.leftTrail, this.colors.blade1);
        this.drawJaggedTrail(ctx, this.rightTrail, this.colors.blade2);

        // Update and Prune Trails
        [this.leftTrail, this.rightTrail].forEach(trail => {
            for (let i = trail.length - 1; i >= 0; i--) {
                trail[i].update();
                if (trail[i].lifetime <= 0) {
                    trail.splice(i, 1);
                }
            }
        });

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
        this.leftTrail = [];
        this.rightTrail = [];
        this.particles = [];
    }
}
