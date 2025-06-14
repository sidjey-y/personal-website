import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glassButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none backdrop-blur-[10px]",
  {
    variants: {
      variant: {
        default: "bg-white/10 border border-white/10 text-white hover:bg-white/15 hover:shadow-lg hover:shadow-black/30",
        primary: "bg-gray-800/80 border border-gray-700/50 text-white hover:bg-gray-800/90 hover:shadow-lg hover:shadow-black/30",
        accent: "bg-gray-500/80 border border-gray-400/20 text-white hover:bg-gray-500/90 hover:shadow-lg hover:shadow-black/30",
        secondary: "bg-gray-700/50 border border-gray-600/30 text-white hover:bg-gray-700/60 hover:shadow-lg hover:shadow-black/30",
        ghost: "bg-transparent hover:bg-white/10 text-white",
        link: "text-white underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1 text-xs",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10 rounded-full",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "hover:-translate-y-1",
        glow: "hover:shadow-[0_0_15px_rgba(150,150,150,0.5)]", 
      },
      darkMode: {
        auto: "",
        always: "bg-gray-900/50 border-gray-800/50 text-white shadow-black/20",
        never: "bg-white/10 border-white/10 text-white",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "bounce",
      darkMode: "auto",
    },
  }
)

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, animation, darkMode, ...props }, ref) => {
    return (
      <button
        className={cn(glassButtonVariants({ variant, size, animation, darkMode, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton, glassButtonVariants } 