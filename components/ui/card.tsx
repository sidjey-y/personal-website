import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    glass?: boolean;
    variant?: "default" | "destructive" | "outline" | "accent" | "secondary";
    size?: "default" | "sm" | "lg";
  }
>(({ className, glass = false, variant = "default", size = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border shadow-sm",
      glass && "glassmorphism-card dark:glassmorphism-card-dark",
      !glass && variant === "default" && "bg-card text-card-foreground dark:shadow-black/20",
      variant === "destructive" && "bg-destructive text-destructive-foreground",
      variant === "outline" && "border-2 border-border bg-transparent dark:border-white/10",
      variant === "accent" && "bg-accent/10 border-accent/20 dark:bg-accent/20 dark:border-accent/30",
      variant === "secondary" && "bg-secondary/10 border-secondary/20 dark:bg-secondary/20 dark:border-secondary/30",
      size === "sm" && "p-4",
      size === "default" && "p-6",
      size === "lg" && "p-8",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
