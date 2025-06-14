import React, { useEffect, useRef } from 'react';

interface ThreadsCanvasProps {
  color?: [number, number, number];
  amplitude?: number;
  count?: number;
}

const ThreadsCanvas: React.FC<ThreadsCanvasProps> = ({
  color = [147, 51, 234], // Purple color
  amplitude = 1,
  count = 40
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const { clientWidth, clientHeight } = document.documentElement;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      canvas.style.width = `${clientWidth}px`;
      canvas.style.height = `${clientHeight}px`;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: 0.5, y: 0.5 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);
    resize();

    class Thread {
      private x: number = 0;
      private y: number = 0;
      private lastY: number = 0;
      private speed: number = Math.random() * 0.1 + 0.05;
      private amplitude: number = Math.random() * 30 + 20;
      private phase: number = Math.random() * Math.PI * 2;
      private width: number = Math.random() * 2 + 1;
      private opacity: number = Math.random() * 0.5 + 0.2;

      constructor(private index: number, private total: number) {
        this.x = (index / total) * canvas.width;
      }

      update(time: number) {
        const mouseInfluence = 50 * amplitude;
        const mouseDist = Math.hypot(
          this.x - mousePos.current.x * canvas.width,
          this.y - mousePos.current.y * canvas.height
        );
        const mouseEffect = Math.max(0, 1 - mouseDist / mouseInfluence);

        this.lastY = this.y;
        this.y = canvas.height * 0.5 + 
          Math.sin(time * this.speed + this.phase) * this.amplitude +
          mouseEffect * mouseInfluence * (mousePos.current.y - 0.5);
      }

      draw(ctx: CanvasRenderingContext2D) {
        const [r, g, b] = color;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
        ctx.lineWidth = this.width;
        ctx.beginPath();
        ctx.moveTo(this.x, this.lastY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      }
    }

    const threads = Array.from({ length: count }, (_, i) => new Thread(i, count));
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      threads.forEach(thread => {
        thread.update(time);
        thread.draw(ctx);
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [color, amplitude, count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ThreadsCanvas; 