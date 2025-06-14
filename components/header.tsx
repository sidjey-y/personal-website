"use client"

import * as React from "react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
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
  
  const closeMenu = () => setIsMenuOpen(false)
  
  const handleNavigation = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId)
      closeMenu()
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={cn(
        "mx-auto px-6 sm:px-8 h-20",
        "flex items-center justify-between",
        "backdrop-blur-[12px] bg-[#2D0449]/10 border-b border-violet-500/10"
      )}>
        <button
          onClick={() => handleNavigation("home")}
          className="relative group"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent
            group-hover:from-violet-300 group-hover:to-purple-500 transition-all duration-300">
            Sidjey
          </span>
          <div className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-all duration-300 group",
                currentPage === index
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              )}
            >
              {item.title}
              <div className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-300 transform",
                currentPage === index
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 scale-x-100"
                  : "bg-violet-500/50 scale-x-0 group-hover:scale-x-100"
              )} />
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative group p-2"
        >
          <Menu className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
          <div className="absolute inset-0 bg-violet-500/20 rounded-lg blur opacity-0 
            group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute inset-x-0 top-20 p-4 backdrop-blur-lg bg-[#2D0449]/90 
              border-b border-violet-500/20 shadow-[0_4px_20px_-1px_rgba(139,92,246,0.3)]"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "relative px-4 py-3 rounded-lg transition-all duration-300 group overflow-hidden",
                    currentPage === index
                      ? "bg-violet-500/20 text-white"
                      : "text-white/60 hover:text-white hover:bg-violet-500/10"
                  )}
                >
                  <span className="relative z-10">{item.title}</span>
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-sm transition-opacity duration-300",
                    currentPage === index ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 