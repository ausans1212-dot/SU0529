import { useEffect, useRef } from 'react';

export default function KomorebiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Adjust canvas resolution dynamically
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // --- Entity Definitions ---

    // 1. Dust Motes (glowing floating micro-particles)
    class Dust {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      glowRadius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = Math.random() * -0.5 - 0.2; // slowly float up
        this.glowRadius = Math.random() * 10 + 5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around
        if (this.y < -50) this.y = height + 50;
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 245, 200, 0.8)';
        context.shadowColor = 'rgba(255, 230, 150, 0.6)';
        context.shadowBlur = this.glowRadius;
        context.fill();
        context.shadowBlur = 0; // reset
      }
    }

    // 2. Translucent Leaves (swaying and falling)
    class Leaf {
      x: number;
      y: number;
      w: number;
      h: number;
      angle: number;
      swing: number;
      swingSpeed: number;
      vy: number;
      vx: number;
      opacity: number;
      phase: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.w = Math.random() * 12 + 8;
        this.h = this.w * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.swing = Math.random() * 0.4 + 0.2;
        this.swingSpeed = Math.random() * 0.02 + 0.01;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = Math.random() * 0.8 + 0.3; // slowly falling
        this.opacity = Math.random() * 0.4 + 0.1;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx + Math.sin(this.phase) * 0.5;
        this.y += this.vy;
        this.phase += this.swingSpeed;
        
        // Wrap around
        if (this.y > height + 50) {
          this.y = -50;
          this.x = Math.random() * width;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle + Math.sin(this.phase) * this.swing);
        
        context.beginPath();
        context.ellipse(0, 0, this.w, this.h, 0, 0, Math.PI * 2);
        // Deep glowing green
        context.fillStyle = `rgba(150, 220, 160, ${this.opacity})`;
        context.shadowColor = 'rgba(100, 255, 120, 0.4)';
        context.shadowBlur = 10;
        context.fill();
        
        context.restore();
      }
    }

    // 3. Sunlight Beams/Spots (Komorebi effect)
    class LightSpot {
      x: number;
      y: number;
      r: number;
      alphaPhase: number;
      alphaSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = Math.random() * 150 + 100;
        this.alphaPhase = Math.random() * Math.PI * 2;
        this.alphaSpeed = Math.random() * 0.005 + 0.002;
      }

      update() {
        this.alphaPhase += this.alphaSpeed;
      }

      draw(context: CanvasRenderingContext2D) {
        const baseAlpha = 0.05;
        const pulse = (Math.sin(this.alphaPhase) + 1) * 0.04; // 0 to 0.08
        const currentAlpha = baseAlpha + pulse;

        const gradient = context.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.r
        );
        gradient.addColorStop(0, `rgba(255, 250, 210, ${currentAlpha})`);
        gradient.addColorStop(1, 'rgba(255, 250, 210, 0)');

        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        context.fillStyle = gradient;
        context.fill();
      }
    }

    // --- State Initialization ---
    const dusts = Array.from({ length: 60 }, () => new Dust());
    const leaves = Array.from({ length: 25 }, () => new Leaf());
    const lightSpots = Array.from({ length: 8 }, () => new LightSpot());

    // --- Render Loop ---
    const render = () => {
      // Clear with dark forest base
      ctx.clearRect(0, 0, width, height);
      
      // Global comp mode for nice glows
      ctx.globalCompositeOperation = 'screen';

      // Draw light spots
      lightSpots.forEach(spot => {
        spot.update();
        spot.draw(ctx);
      });

      // Draw swaying leaves
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw(ctx);
      });

      // Draw dust
      dusts.forEach(dust => {
        dust.update();
        dust.draw(ctx);
      });

      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
