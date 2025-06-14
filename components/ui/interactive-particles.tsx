import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  originalX: number;
  originalY: number;
}

interface Mouse {
  x: number;
  y: number;
  radius: number;
}

interface InteractiveParticlesProps {
  className?: string;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: 0, y: 0, radius: 150 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Initialize particles
    const initParticles = () => {
      const techColors = [
        '#9333EA', // Purple
        '#A855F7', // Light Purple
        '#6366F1', // Indigo
        '#8B5CF6', // Violet
      ];

      particlesRef.current = [];
      const numberOfParticles = 100;
      const padding = 100;

      for (let i = 0; i < numberOfParticles; i++) {
        const x = padding + Math.random() * (canvas.width - padding * 2);
        const y = padding + Math.random() * (canvas.height - padding * 2);
        
        particlesRef.current.push({
          x,
          y,
          size: Math.random() * 2 + 2,
          vx: 0,
          vy: 0,
          color: techColors[Math.floor(Math.random() * techColors.length)],
          originalX: x,
          originalY: y,
        });
      }
    };

    // Animation
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = mouseRef.current.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * 5;
        const directionY = forceDirectionY * force * 5;

        if (distance < maxDistance) {
          // Repel from mouse
          particle.vx -= directionX;
          particle.vy -= directionY;
        }

        // Return to original position
        const dx2 = particle.originalX - particle.x;
        const dy2 = particle.originalY - particle.y;
        particle.vx += dx2 * 0.05;
        particle.vy += dy2 * 0.05;

        // Apply friction
        particle.vx *= 0.9;
        particle.vy *= 0.9;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connection lines
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(147, 51, 234, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Setup
    handleResize();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-auto",
        className
      )}
      style={{
        background: 'transparent',
        touchAction: 'none',
        cursor: 'default'
      }}
    />
  );
};

export default InteractiveParticles; 