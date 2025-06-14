import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "dark" | "accent" | "secondary"
  hoverEffect?: boolean
  borderEffect?: boolean
  blurStrength?: "light" | "medium" | "strong"
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    className, 
    variant = "default", 
    hoverEffect = true, 
    borderEffect = true,
    blurStrength = "medium",
    children, 
    ...props 
  }, ref) => {
    const blurValues = {
      light: "backdrop-blur-[5px]",
      medium: "backdrop-blur-[10px]",
      strong: "backdrop-blur-[15px]"
    }
    
    const variants = {
      default: "bg-white/10 border-white/10 text-white",
      dark: "bg-gray-900/40 border-gray-800/30 text-white",
      accent: "bg-gray-700/30 border-gray-600/30 text-white",
      secondary: "bg-gray-800/20 border-gray-700/30 text-white"
    }
    
    const hover = hoverEffect 
      ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/15" 
      : "transition-all duration-300"
    
    const border = borderEffect 
      ? "border" 
      : "border-0"
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6",
          blurValues[blurStrength],
          variants[variant],
          hover,
          border,
          "shadow-lg shadow-black/20",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = "GlassCard" 