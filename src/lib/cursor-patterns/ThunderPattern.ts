import { BreathingPattern, Point } from './types';

class LightningBranch {
    startX: number;
    startY: number;
    segments: { x: number, y: number }[] = [];
    alpha: number;
    maxLength: number;

    constructor(x: number, y: number, initialAlpha: number) {
        this.startX = x;
        this.startY = y;
        this.segments = [{ x: x, y: y }];
        this.alpha = initialAlpha;
        this.maxLength = Math.random() * 15 + 10;
        let currentPoint = { x: x, y: y };
        for (let i = 0; i < this.maxLength; i++) {
            const angle = Math.random() * Math.PI * 2;
            const length = Math.random() * 3 + 1;
            const nextPoint = {
                x: currentPoint.x + Math.cos(angle) * length,
                y: currentPoint.y + Math.sin(angle) * length
            };
            this.segments.push(nextPoint);
            currentPoint = nextPoint;
        }
    }

    update() {
        this.alpha -= 0.04;
    }

    draw(ctx: CanvasRenderingContext2D, colors: any) {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = colors.branchStroke;
        ctx.lineWidth = 1;
        ctx.shadowColor = colors.branchShadow;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
            ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        ctx.stroke();
        ctx.restore();
    }
}

class LightningBolt {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    segments: { x: number, y: number }[] = [];
    alpha = 1.0;
    branches: LightningBranch[] = [];

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.startX = x1;
        this.startY = y1;
        this.endX = x2;
        this.endY = y2;
        this.createPath();
    }

    createPath() {
        const dx = this.endX - this.startX;
        const dy = this.endY - this.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        this.segments.push({ x: this.startX, y: this.startY });
        let currentPos = { x: this.startX, y: this.startY };
        const segmentCount = Math.max(8, distance / 10);
        for (let i = 1; i < segmentCount; i++) {
            const progress = i / segmentCount;
            const linearX = this.startX + dx * progress;
            const linearY = this.startY + dy * progress;
            const offset = (Math.random() - 0.5) * distance * 0.15;
            const offsetX = Math.cos(angle + Math.PI / 2) * offset;
            const offsetY = Math.sin(angle + Math.PI / 2) * offset;
            currentPos = { x: linearX + offsetX, y: linearY + offsetY };
            this.segments.push(currentPos);
            if (Math.random() < 0.25) {
                this.branches.push(new LightningBranch(currentPos.x, currentPos.y, 0.7));
            }
        }
        this.segments.push({ x: this.endX, y: this.endY });
    }

    update() {
        this.alpha -= 0.02;
        this.branches.forEach(branch => branch.update());
    }

    draw(ctx: CanvasRenderingContext2D, colors: any) {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = colors.mainStroke;
        ctx.lineWidth = 4;
        ctx.shadowColor = colors.mainShadow;
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
            ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        ctx.stroke();
        ctx.strokeStyle = colors.innerStroke;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
        this.branches.forEach(branch => branch.draw(ctx, colors));
    }
}

export class ThunderPattern implements BreathingPattern {
    private bolts: LightningBolt[] = [];
    private canCreateBolt = true;
    private lastMousePos: Point | null = null;
    private colors: any;
    private isDarkMode = true;

    private boltColors = {
        dark: {
            bg: 'rgba(12, 10, 26, 0.25)',
            mainStroke: '#FFFF99',
            mainShadow: '#FFD700',
            innerStroke: '#FFFFFF',
            branchStroke: '#FFD700',
            branchShadow: '#FFFF00',
        },
        light: {
            bg: 'rgba(230, 240, 255, 0.25)',
            mainStroke: '#00BFFF', // DeepSkyBlue
            mainShadow: '#1E90FF', // DodgerBlue
            innerStroke: '#FFFFFF',
            branchStroke: '#87CEEB', // SkyBlue
            branchShadow: '#4682B4', // SteelBlue
        }
    };

    init(canvas: HTMLCanvasElement) {
        // Initial setup if needed
    }

    resize(width: number, height: number) {
        // Resize logic if needed (canvas handles width/height)
    }

    updateTheme(isDarkMode: boolean) {
        this.isDarkMode = isDarkMode;
        this.colors = isDarkMode ? this.boltColors.dark : this.boltColors.light;
    }

    handleMouseMove(e: MouseEvent) {
        if (this.lastMousePos && this.canCreateBolt) {
            this.bolts.push(new LightningBolt(this.lastMousePos.x, this.lastMousePos.y, e.clientX, e.clientY));
            this.canCreateBolt = false;
            setTimeout(() => this.canCreateBolt = true, 30);
        }
        this.lastMousePos = { x: e.clientX, y: e.clientY };
    }

    update(ctx: CanvasRenderingContext2D) {
        if (!this.colors) return;

        // Clear handled by Canvas component, but we can fill bg
        ctx.fillStyle = this.colors.bg;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = this.bolts.length - 1; i >= 0; i--) {
            const bolt = this.bolts[i];
            bolt.update();
            bolt.draw(ctx, this.colors);
            if (bolt.alpha <= 0) {
                this.bolts.splice(i, 1);
            }
        }
    }

    destroy() {
        this.bolts = [];
    }
}
