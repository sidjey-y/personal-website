"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { GallerySection } from "@/components/gallery-section"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ContactSection } from "@/components/contact-section"

interface SectionComponent {
  id: string
  component: React.ComponentType<{ navigateToSection?: (sectionId: string) => void }>
  label: string
}

const sections: SectionComponent[] = [
  { id: "home", component: HeroSection, label: "Home" },
  { id: "about", component: AboutSection, label: "About Me" },
  { id: "skills", component: SkillsSection, label: "Skills" },
  { id: "projects", component: ProjectsSection, label: "Projects" },
  { id: "gallery", component: GallerySection, label: "Gallery" },
  { id: "contact", component: ContactSection, label: "Contact" },
]

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        navigateToPage(currentPage + 1)
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        navigateToPage(currentPage - 1)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, isAnimating])

  useEffect(() => {
    // Check if content is scrollable
    const checkScrollable = () => {
      if (contentRef.current) {
        const { scrollHeight, clientHeight } = contentRef.current
        const scrollable = scrollHeight > clientHeight
        setIsScrollable(scrollable)
        setIsAtTop(contentRef.current.scrollTop <= 0)
        setIsAtBottom(
          contentRef.current.scrollTop + contentRef.current.clientHeight >= 
          contentRef.current.scrollHeight - 5
        )
      }
    }
    
    checkScrollable()
    
    // Add resize listener to recheck scrollability
    window.addEventListener("resize", checkScrollable)
    
    // Add scroll listener to check position
    const currentRef = contentRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollable)
    }
    
    return () => {
      window.removeEventListener("resize", checkScrollable)
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollable)
      }
    }
  }, [currentPage])

  useEffect(() => {
    let lastScrollTime = 0
    const scrollCooldown = 1000 // ms

    const handleWheel = (e: WheelEvent) => {
      // Disable automatic section scrolling on wheel events
      return
    }

    window.addEventListener("wheel", handleWheel)
    return () => window.removeEventListener("wheel", handleWheel)
  }, [currentPage, isAnimating, isScrollable, isAtTop, isAtBottom])

  const navigateToPage = (index: number) => {
    if (index < 0 || index >= sections.length) return
    if (isAnimating) return
    
    setDirection(index > currentPage ? 1 : -1)
    setCurrentPage(index)
    setIsAnimating(true)
    
    // Update URL hash without triggering scroll
    const section = sections[index]
    if (section) {
      window.history.pushState(null, "", `#${section.id}`)
    }
  }

  const navigateToSection = (sectionId: string) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId)
    if (sectionIndex !== -1) {
      navigateToPage(sectionIndex)
    }
  }

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  const pageTransition = {
    type: "tween",
    duration: 0.5,
  }

  const CurrentSection = sections[currentPage].component

  const handleNextPage = () => {
    navigateToPage(1) 
  }

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col relative bg-black">
      <Header currentPage={currentPage} onNavigate={navigateToSection} />
      
      {/* Main content with page transitions */}
      <div className="flex-grow relative">
        <AnimatePresence mode="wait" custom={direction} onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0 overflow-y-auto bg-black"
            ref={contentRef}
          >
            <CurrentSection navigateToSection={navigateToSection} />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className={cn(
          "py-2 px-3 rounded-full flex items-center gap-2",
          "backdrop-blur-[10px] bg-black/50 border border-violet-500/20 shadow-lg"
        )}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => navigateToSection(section.id)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                currentPage === index 
                  ? "bg-accent scale-125 shadow-md shadow-accent/30" 
                  : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to ${section.label}`}
            />
          ))}
        </div>
      </div>
      
      <Footer className="z-50" />
    </main>
  )
}
