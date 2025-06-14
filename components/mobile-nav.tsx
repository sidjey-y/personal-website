"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  className?: string
  items?: {
    href: string
    title: string
    icon?: React.ReactNode
  }[]
  isOpen: boolean
  onClose: () => void
  currentPage?: number
  onNavigate?: (index: number) => void
}

export function MobileNav({ className, items, isOpen, onClose, currentPage = 0, onNavigate }: MobileNavProps) {
  React.useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [isOpen, onClose])

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])
  
  const handleClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(index)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={cn(
              "fixed top-0 right-0 z-50 w-3/4 max-w-xs h-full flex flex-col",
              "backdrop-blur-[15px] bg-gray-900/90 border-l border-gray-800 text-white shadow-lg",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="font-bold text-xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              >
                Menu
              </motion.span>
              
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={cn(
                    "p-2 rounded-full backdrop-blur-[10px] bg-white/10 border border-white/10"
                  )}
                  aria-label="Close menu"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>
              </div>
            </div>
            
            {/* Menu Items */}
            <nav className="flex-1 overflow-auto py-6">
              <ul className="flex flex-col gap-1 px-4">
                {items?.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <Link 
                      href={item.href}
                      onClick={(e) => handleClick(e, index)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300",
                        "backdrop-blur-[5px] bg-white/5 border border-white/5 hover:bg-white/10",
                        currentPage === index && "bg-white/10 border-white/10 text-white"
                      )}
                    >
                      {item.icon && (
                        <span className="text-white">{item.icon}</span>
                      )}
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={cn(
                  "rounded-xl p-4 text-center",
                  "backdrop-blur-[10px] bg-white/5 border border-white/10 text-white"
                )}
              >
                <p className="text-sm font-medium">Sidjey Haboc</p>
                <p className="text-xs opacity-80 mt-1">Computer Science Student, Specializing in Statistical Computing</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
