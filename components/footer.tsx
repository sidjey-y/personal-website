"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("py-3 relative", className)}>
      <div className="container mx-auto px-6">
        <div className={cn(
          "rounded-lg px-6 py-3 backdrop-blur-[15px] bg-white/5 border border-white/10 shadow-sm shadow-black/20"
        )}>
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div>
              <p className="text-sm font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Sidjey Haboc
              </p>
            </div>
            
            {/* Social links */}
            <div className="flex items-center space-x-3">
              {[
                { icon: <Github className="h-4 w-4" />, href: "https://github.com/sidjey-y", label: "GitHub" },
                { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/cj-haboc/", label: "LinkedIn" },
                { icon: <Mail className="h-4 w-4" />, href: "mailto:haboc.carlajoy@gmail.com", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-1.5 rounded-full backdrop-blur-[10px] bg-white/10 border border-white/10 hover:bg-white/15 transition-all duration-300"
                  )}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 