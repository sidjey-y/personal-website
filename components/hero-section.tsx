"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Instagram, ArrowDown, Code, Brain, Terminal } from "lucide-react"
import Link from "next/link"
import ThreadsCanvas from "@/components/ui/threads-canvas"

interface HeroSectionProps {
  navigateToSection?: (sectionId: string) => void
}

export default function HeroSection({ navigateToSection }: HeroSectionProps) {
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* Threads Animation Background */}
      <div className="absolute inset-0 -z-10">
        <ThreadsCanvas
          color={[147, 51, 234]}
          amplitude={1}
          count={40}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="flex flex-col items-center space-y-12">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-2 rounded-full bg-[#2D0449]/30 border border-violet-500/20
              backdrop-blur-sm text-sm text-white/80"
          >
            Personal Website
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden 
                border-4 border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              <Image
                src="/images/profile-new.jpeg"
                alt="Sidjey's Profile Picture"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
              >
                Hi, I'm <span className="text-glow bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent 
                  drop-shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-pulse-slow">Sidjey</span>!
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-4 text-white/60"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
                  <Code className="w-5 h-5 text-violet-400" />
                  <span>Computer Science</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
                  <Brain className="w-5 h-5 text-violet-400" />
                  <span>AI & ML</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm">
                  <Terminal className="w-5 h-5 text-violet-400" />
                  <span>Data Science</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              >
                Computer Science student specializing in Statistical Computing, passionate about AI, ML, 
                Data Science, and community-driven tech innovation.
              </motion.p>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex items-center gap-6"
          >
            <Link
              href="https://github.com/sidjey-y"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-white/70 hover:text-white bg-white/5 rounded-full transition-all duration-300 
                hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/cj-haboc/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-white/70 hover:text-white bg-white/5 rounded-full transition-all duration-300 
                hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.instagram.com/sidjeyie/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-white/70 hover:text-white bg-white/5 rounded-full transition-all duration-300 
                hover:scale-110 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Instagram className="w-6 h-6" />
            </Link>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => navigateToSection?.("contact")}
              className="px-6 py-3 bg-violet-600 rounded-lg text-white font-semibold 
                shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] 
                transition-all duration-300 hover:scale-105 hover:bg-violet-500"
            >
              Contact Me
            </button>
            <button
              onClick={() => navigateToSection?.("projects")}
              className="px-6 py-3 bg-white/5 rounded-lg text-white font-semibold 
                border border-violet-500/20 hover:bg-white/10 transition-all duration-300 
                hover:scale-105 hover:border-violet-500/40"
            >
              View Projects
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 1.4,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 1
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ArrowDown className="w-6 h-6 text-white/50" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}