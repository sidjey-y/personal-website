"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Github, Linkedin, Instagram, ArrowDown, Code, Brain, Terminal } from "lucide-react"
import Link from "next/link"
import ThreadsCanvas from "@/components/ui/threads-canvas"
import InteractiveParticles from "@/components/ui/interactive-particles"

interface HeroSectionProps {
  navigateToSection?: (sectionId: string) => void
}

export default function HeroSection({ navigateToSection }: HeroSectionProps) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-black overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <InteractiveParticles />
      </div>
      
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[#9333EA]/5 blur-[100px] opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-[#1b022c]/20 blur-[80px] opacity-50 animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8 text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-40 h-40 mb-4"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 blur-lg opacity-50 animate-pulse-slow" />
            <div className="relative w-full h-full rounded-full border-2 border-violet-500/20 overflow-hidden">
              <Image
                src="/images/profile-new.jpeg"
                alt="Sidjey"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <div className="space-y-6 w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl sm:text-5xl font-bold text-center"
            >
              Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">Sidjey</span>!
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Computer Science student specializing in Statistical Computing, passionate about AI, ML, 
              Data Science, and community-driven tech innovation.
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex items-center justify-center gap-4"
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex items-center justify-center gap-4"
          >
            <button
              onClick={() => navigateToSection?.("contact")}
              className="px-6 py-3 bg-[#2D0449] rounded-lg text-white font-semibold 
                shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] 
                transition-all duration-300 hover:scale-105 hover:bg-[#3D055A]"
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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