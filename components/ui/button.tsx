import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-white/10 dark:hover:bg-accent/20 dark:text-white/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary/80 dark:text-secondary-foreground dark:hover:bg-secondary/70",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground dark:hover:bg-accent/20 dark:text-white/90",
        link: "text-primary underline-offset-4 hover:underline dark:text-primary-foreground",
        coral: "bg-accent text-accent-foreground hover:bg-accent/90 dark:bg-accent/80 dark:hover:bg-accent/70 dark:text-white",
        glass: "glassmorphism hover:bg-accent/10 backdrop-blur-md dark:hover:bg-accent/20 dark:shadow-black/20 dark:text-white/90",
        "glass-accent": "glassmorphism bg-accent/20 text-primary hover:bg-accent/30 backdrop-blur-md dark:text-white dark:bg-accent/30 dark:hover:bg-accent/40 dark:shadow-black/20",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-12 rounded-full px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
