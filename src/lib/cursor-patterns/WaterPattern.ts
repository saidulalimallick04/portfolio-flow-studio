import { BreathingPattern, Point } from './types';

// Particle for splashes/droplets
class WaterParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    maxLife: number;
    color: string;

    constructor(x: number, y: number, vx: number, vy: number, color: string) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = Math.random() * 3 + 1; // Varied size
        this.maxLife = Math.random() * 20 + 10; // Short life for splashes
        this.life = this.maxLife;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // Gravity
        this.life--;
        this.size *= 0.95; // Shrink
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Flow line (curvy tendril)
class FlowLine {
    points: Point[] = [];
    life: number;
    maxLife: number;
    color: string;

    constructor(x: number, y: number, angle: number, speed: number, color: string) {
        this.points.push({ x, y });
        this.maxLife = Math.random() * 30 + 20;
        this.life = this.maxLife;
        this.color = color;

        // Generate a curvy path
        let currentX = x;
        let currentY = y;
        let currentAngle = angle + (Math.random() - 0.5) * 1.5; // Diverge from main path

        for (let i = 0; i < 10; i++) {
            const step = speed * (1.5 + Math.random());
            currentX += Math.cos(currentAngle) * step;
            currentY += Math.sin(currentAngle) * step;
            currentAngle += (Math.random() - 0.5) * 0.5; // Curve
            this.points.push({ x: currentX, y: currentY });
        }
    }

    update() {
        this.life--;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.points.length < 2) return;
        ctx.save();
        ctx.globalAlpha = (this.life / this.maxLife) * 0.8;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        // Smooth curve through points
        for (let i = 1; i < this.points.length - 1; i++) {
            const xc = (this.points[i].x + this.points[i + 1].x) / 2;
            const yc = (this.points[i].y + this.points[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
        }
        ctx.stroke();
        ctx.restore();
    }
}


export class WaterPattern implements BreathingPattern {
    private points: (Point & { angle: number, width: number, alpha: number })[] = [];
    private particles: WaterParticle[] = [];
    private flowLines: FlowLine[] = [];
    private colors: any;
    private isDarkMode = true;
    private lastMousePos: Point | null = null;

    // Smooth trail parameters
    private historySize = 35; // Longer trail for "high speed" persistence

    private themeColors = {
        dark: {
            core: '#0ea5e9', // Deep Sky Blue
            edge: '#22d3ee', // Cyan
            foam: '#e0f2fe', // Lightest Blue
            particle: '#38bdf8'
        },
        light: {
            core: '#0284c7', // Darker Blue for visibility
            edge: '#0ea5e9',
            foam: '#ffffff',
            particle: '#0ea5e9'
        }
    };

    init(canvas: HTMLCanvasElement) {
        // Initial setup
    }

    resize(width: number, height: number) {
        // Handled by canvas
    }

    updateTheme(isDarkMode: boolean) {
        this.isDarkMode = isDarkMode;
        this.colors = isDarkMode ? this.themeColors.dark : this.themeColors.light;
    }

    handleMouseMove(e: MouseEvent) {
        const currentPos = { x: e.clientX, y: e.clientY };

        if (this.lastMousePos) {
            const dx = currentPos.x - this.lastMousePos.x;
            const dy = currentPos.y - this.lastMousePos.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            // "High Speed" Logic
            // The faster you go, the thinner the main stream (tension) but more particles
            const speedFactor = Math.min(dist / 50, 1); // 0 to 1
            const width = 25 - (speedFactor * 15); // 25px (slow) -> 10px (fast)

            this.points.push({
                x: currentPos.x,
                y: currentPos.y,
                angle: angle,
                width: width,
                alpha: 1.0
            });

            // Splash Particles on high speed or sharp turns
            if (dist > 15) { // Threshold for "High Speed"
                const count = Math.floor(dist / 5);
                for (let i = 0; i < count; i++) {
                    const pAngle = angle + (Math.random() - 0.5) * 2; // Spread
                    const speed = (Math.random() * 5 + 5) * speedFactor;
                    this.particles.push(new WaterParticle(
                        currentPos.x,
                        currentPos.y,
                        Math.cos(pAngle) * speed,
                        Math.sin(pAngle) * speed,
                        this.colors.particle
                    ));
                }

                // Spawn Flow Lines (curvy tendrils)
                if (Math.random() < 0.4) {
                    this.flowLines.push(new FlowLine(
                        currentPos.x, currentPos.y,
                        angle - Math.PI, // Trail behind
                        dist * 0.5,
                        this.colors.foam
                    ));
                }
            }
        } else {
            this.points.push({ x: currentPos.x, y: currentPos.y, angle: 0, width: 20, alpha: 1.0 });
        }

        if (this.points.length > this.historySize) {
            this.points.shift();
        }

        this.lastMousePos = currentPos;
    }

    update(ctx: CanvasRenderingContext2D) {
        if (!this.colors) return;

        // Clear happens in parent

        // 1. Draw Flow Lines (Bottom Layer)
        for (let i = this.flowLines.length - 1; i >= 0; i--) {
            this.flowLines[i].update();
            this.flowLines[i].draw(ctx);
            if (this.flowLines[i].life <= 0) this.flowLines.splice(i, 1);
        }

        // 2. Draw Main Water Trail
        if (this.points.length > 2) {
            // Create a fluid shape from points
            ctx.beginPath();

            // Right Side of the stream
            for (let i = 0; i < this.points.length; i++) {
                const p = this.points[i];
                const w = p.width * (i / this.points.length); // Taper tail
                const px = p.x + Math.cos(p.angle + Math.PI / 2) * w;
                const py = p.y + Math.sin(p.angle + Math.PI / 2) * w;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }

            // Left Side of the stream (reverse)
            for (let i = this.points.length - 1; i >= 0; i--) {
                const p = this.points[i];
                const w = p.width * (i / this.points.length); // Taper tail
                // Add some "wobble" to the tail for liquid feel
                const wobble = Math.sin(Date.now() / 100 + i) * 2;
                const px = p.x + Math.cos(p.angle - Math.PI / 2) * (w + wobble);
                const py = p.y + Math.sin(p.angle - Math.PI / 2) * (w + wobble);
                ctx.lineTo(px, py);
            }

            ctx.closePath();

            // Gradient Fill
            const gradient = ctx.createLinearGradient(
                this.points[0].x, this.points[0].y,
                this.points[this.points.length - 1].x, this.points[this.points.length - 1].y
            );
            gradient.addColorStop(0, 'rgba(0,0,0,0)'); // Fade out tail
            gradient.addColorStop(0.5, this.colors.core);
            gradient.addColorStop(1, this.colors.foam); // Bright head

            ctx.fillStyle = gradient;
            ctx.shadowColor = this.colors.edge;
            ctx.shadowBlur = 15;
            ctx.fill();

            // Edge highlight
            ctx.strokeStyle = this.colors.edge;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Decay points logic
            this.points.forEach(p => p.alpha -= 0.05); // Fade out? 
            // Actually points are removed by length limit, but we can animate properties here
        }

        // 3. Draw Particles (Top Layers)
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].draw(ctx);
            if (this.particles[i].life <= 0) this.particles.splice(i, 1);
        }
    }

    destroy() {
        this.points = [];
        this.particles = [];
        this.flowLines = [];
    }
}
