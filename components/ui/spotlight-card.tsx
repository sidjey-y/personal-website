import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({ 
  children, 
  className = "", 
  spotlightColor = "rgba(147, 51, 234, 0.2)" // Default purple spotlight
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "card-spotlight relative rounded-2xl border border-[#2D0449] bg-[#1b022c] p-8 overflow-hidden",
        "before:content-[''] before:absolute before:inset-0",
        "before:bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),var(--spotlight-color),transparent_80%)]",
        "before:opacity-0 before:transition-opacity before:duration-500 before:ease-in-out before:pointer-events-none",
        "hover:before:opacity-60 focus-within:before:opacity-60",
        className
      )}
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--spotlight-color": spotlightColor,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default SpotlightCard; 