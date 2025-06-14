"use client"

import React, { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class - simplified for better performance
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1 + 0.1 // Reduced size
        this.speedX = (Math.random() - 0.5) * 0.1 // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.1
        this.opacity = Math.random() * 0.2 + 0.02 // More transparent
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles - reduced count for better performance
    const particles: Particle[] = []
    const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 30000)) // Fewer particles
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Line connection class - optimized to check fewer connections
    class Connection {
      static draw(p1: Particle, p2: Particle) {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 80 // Reduced connection distance

        if (distance < maxDistance) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${(maxDistance - distance) / maxDistance * 0.05})` // More transparent lines
          ctx.lineWidth = 0.1
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }
    }

    // Vignette effect - simplified
    class Vignette {
      static draw() {
        const gradient = ctx.createRadialGradient(
          canvas.width / 2, 
          canvas.height / 2, 
          0, 
          canvas.width / 2, 
          canvas.height / 2, 
          canvas.width / 1.5
        )
        
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.2)") // Lighter vignette
        
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    // Track frame count for optimization
    let frameCount = 0
    
    // Animation loop - optimized
    const animate = () => {
      frameCount++
      
      // Clear canvas with semi-transparent black for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)" // More transparent trail
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Connect particles - only check every other frame and limit connections
        if (frameCount % 3 === 0) { // Reduced connection frequency
          // Only check nearby particles (not all combinations)
          for (let j = i + 1; j < Math.min(i + 3, particles.length); j++) { // Fewer connections
            Connection.draw(particles[i], particles[j])
          }
        }
      }

      // Apply vignette effect - only every 5 frames
      if (frameCount % 5 === 0) {
        Vignette.draw()
      }
      
      // Reset frame counter to prevent overflow
      if (frameCount > 1000) frameCount = 0

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-20 pointer-events-none opacity-20" // Reduced opacity
    />
  )
} 