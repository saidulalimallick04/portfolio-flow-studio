export interface Point {
    x: number;
    y: number;
}

export interface BreathingPattern {
    init(canvas: HTMLCanvasElement): void;
    resize(width: number, height: number): void;
    handleMouseMove(e: MouseEvent): void;
    update(ctx: CanvasRenderingContext2D): void;
    destroy(): void;
    updateTheme(isDarkMode: boolean): void;
}
