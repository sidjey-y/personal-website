"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn, glassmorphism } from "@/lib/utils"

interface MainNavProps {
  className?: string
  items?: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
  onMenuClick?: () => void
  currentPage?: number
  onNavigate?: (index: number) => void
}

export function MainNav({ className, items, onMenuClick, currentPage = 0, onNavigate }: MainNavProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(index)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-300",
        scrolled ? 
          cn("backdrop-blur-[15px] bg-background/70 border-b border-white/10 shadow-sm") : 
          "bg-transparent",
        className
      )}
    >
      <div className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-2xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            Sidjey
          </motion.span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {items?.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={(e) => handleClick(e, index)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-gray-300 relative group px-3 py-2",
                  currentPage === index
                    ? "text-white"
                    : "text-gray-400"
                )}
              >
                <span className="relative z-10">{item.title}</span>
                <span className={cn(
                  "absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-white transform origin-left transition-all duration-300",
                  currentPage === index ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.button 
          className={cn(
            "md:hidden p-2 rounded-full",
            "backdrop-blur-[10px] bg-white/15 border border-white/20"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          aria-label="Menu"
          onClick={onMenuClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  )
} 