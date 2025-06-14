import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Glassmorphism utility classes
export const glassmorphism = {
  // Base glassmorphism styles
  base: "backdrop-blur-[10px] bg-white/15 border border-white/20 shadow-lg dark:bg-primary/30 dark:border-white/5 dark:shadow-black/20",
  
  // Variants
  light: "backdrop-blur-[8px] bg-white/10 border border-white/10 dark:bg-primary/25 dark:border-white/5",
  medium: "backdrop-blur-[10px] bg-white/15 border border-white/20 dark:bg-primary/30 dark:border-white/5",
  strong: "backdrop-blur-[15px] bg-white/20 border border-white/30 dark:bg-primary/35 dark:border-white/10",
  
  // Theme-specific variants
  primary: "backdrop-blur-[10px] bg-primary/15 border border-primary/10 dark:bg-primary/40 dark:border-primary/20",
  accent: "backdrop-blur-[10px] bg-accent/15 border border-accent/10 dark:bg-accent/25 dark:border-accent/15",
  secondary: "backdrop-blur-[10px] bg-secondary/15 border border-secondary/10 dark:bg-secondary/25 dark:border-secondary/15",
  
  // Dark variants
  darkBase: "backdrop-blur-[10px] bg-primary/30 border border-white/5 text-white/90",
  darkAccent: "backdrop-blur-[10px] bg-accent/30 border border-accent/15",
  
  // Interactive elements
  button: "backdrop-blur-[10px] bg-white/15 hover:bg-white/25 border border-white/20 transition-all duration-300 dark:bg-primary/30 dark:hover:bg-primary/40 dark:border-white/10",
  buttonAccent: "backdrop-blur-[10px] bg-accent/80 hover:bg-accent/90 border border-accent/20 text-white transition-all duration-300 dark:bg-accent/70 dark:hover:bg-accent/80",
  
  // Card with hover effect
  card: "backdrop-blur-[10px] bg-white/15 border border-white/20 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 dark:bg-primary/30 dark:border-white/5 dark:shadow-black/20",
  
  // Navigation elements
  nav: "backdrop-blur-[15px] bg-background/70 border-b border-white/10 shadow-sm dark:bg-primary/50 dark:border-white/5 dark:shadow-black/20",
}

// Animation utility for staggered animations
export function staggeredAnimation(index: number, baseDelay: number = 0.1) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: baseDelay * index }
  }
}

// Theme transition utility
export function themeTransition() {
  return {
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.5
    }
  }
}
