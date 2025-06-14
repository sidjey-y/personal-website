"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Update cursor position directly without state for better performance
    const cursor = document.getElementById("cursor-dot")
    const cursorBorder = document.getElementById("cursor-border")
    
    const updatePosition = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      
      // Direct DOM manipulation for faster response
      if (cursor) {
        cursor.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`
      }
      
      if (cursorBorder) {
        cursorBorder.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`
      }
      
      // Only update React state occasionally for other effects
      setPosition({ x, y })
    }

    // Handle mouse click
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    // Handle link hover
    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    // Handle cursor visibility
    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)

    // Add link hover detection to all clickable elements
    const addLinkHoverListeners = () => {
      const links = document.querySelectorAll('a, button, [role="button"]')
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleLinkHoverStart)
        link.addEventListener("mouseleave", handleLinkHoverEnd)
      })
    }

    // Add event listeners
    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    
    // Initial setup for link hover detection
    addLinkHoverListeners()

    // Setup mutation observer to detect dynamically added links
    const observer = new MutationObserver(() => {
      addLinkHoverListeners()
    })
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    })

    return () => {
      // Cleanup event listeners
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      
      // Cleanup link hover listeners
      const links = document.querySelectorAll('a, button, [role="button"]')
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverStart)
        link.removeEventListener("mouseleave", handleLinkHoverEnd)
      })
      
      // Disconnect observer
      observer.disconnect()
    }
  }, [])

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none"
    
    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  const lerp = (start: number, end: number, factor: number) => {
    // Increase speed by using a larger factor (0.2 -> 0.4)
    return start + (end - start) * 0.4
  }

  return (
    <>
      {/* Main cursor dot - using direct DOM manipulation for position */}
      <div
        id="cursor-dot"
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference transition-transform duration-75 ease-linear ${
          clicked ? "scale-75" : linkHovered ? "scale-150" : "scale-100"
        } ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{ transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)` }}
      />

      {/* Cursor border - using direct DOM manipulation for position */}
      <div
        id="cursor-border"
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-white z-[9998] pointer-events-none mix-blend-difference transition-transform duration-150 ease-linear ${
          clicked ? "scale-110" : linkHovered ? "scale-150" : "scale-100"
        } ${hidden ? "opacity-0" : "opacity-30"}`}
        style={{ transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)` }}
      />
    </>
  )
} 