"use client"

import * as React from "react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface HeaderProps {
  currentPage: number
  onNavigate: (sectionId: string) => void
}

const navItems = [
  { href: "home", title: "Home" },
  { href: "about", title: "About" },
  { href: "skills", title: "Skills" },
  { href: "projects", title: "Projects" },
  { href: "gallery", title: "Gallery" },
  { href: "contact", title: "Contact" },
]

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)
  
  const handleNavigation = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId)
      closeMenu()
    }
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className={cn(
        "mx-auto px-6 sm:px-8 h-20",
        "flex items-center justify-between",
        "transition-all duration-300",
        scrolled 
          ? "backdrop-blur-[12px] bg-[#2D0449]/80 shadow-[0_4px_30px_-10px_rgba(147,51,234,0.3)]" 
          : "backdrop-blur-[8px] bg-[#2D0449]/10",
        "border-b border-violet-500/10"
      )}>
        <motion.button
          onClick={() => handleNavigation("home")}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span 
            className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent
              group-hover:from-violet-300 group-hover:to-purple-500 transition-all duration-300"
            initial={{ backgroundPosition: "0% 50%" }}
            whileHover={{ backgroundPosition: "100% 50%" }}
          >
            Sidjey
          </motion.span>
          <motion.div 
            className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-lg
              opacity-0 group-hover:opacity-75 transition-opacity duration-300"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.2 }}
          />
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-all duration-300 group",
                currentPage === index
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {item.title}
              <motion.div 
                className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-300",
                  currentPage === index
                    ? "bg-gradient-to-r from-violet-500 to-purple-500"
                    : "bg-violet-500/50"
                )}
                initial={{ scaleX: currentPage === index ? 1 : 0 }}
                animate={{ scaleX: currentPage === index ? 1 : 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative group p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            ) : (
              <Menu className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-violet-500/20 rounded-lg blur opacity-0 
            group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute inset-x-0 top-20 backdrop-blur-lg bg-[#2D0449]/90 
              border-b border-violet-500/20 shadow-[0_4px_20px_-1px_rgba(139,92,246,0.3)]
              overflow-hidden"
          >
            <motion.div 
              className="flex flex-col gap-2 p-4"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.07,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="closed"
              animate="open"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "relative px-4 py-3 rounded-lg transition-all duration-300 group overflow-hidden",
                    currentPage === index
                      ? "bg-violet-500/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-violet-500/10"
                  )}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1
                    },
                    closed: {
                      y: 20,
                      opacity: 0
                    }
                  }}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.title}</span>
                  <motion.div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-sm",
                      currentPage === index ? "opacity-100" : "opacity-0"
                    )}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
} 