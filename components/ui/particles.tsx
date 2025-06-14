"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
  baseX: number
  baseY: number
}

interface ParticlesProps {
  particleCount?: number
  particleColors?: string[]
  speed?: number
  moveParticlesOnHover?: boolean
  alphaParticles?: boolean
  particleBaseSize?: number
  className?: string
}

const Particles = ({
  particleCount = 100,
  particleColors = ["#ffffff"],
  speed = 0.5,
  moveParticlesOnHover = true,
  alphaParticles = true,
  particleBaseSize = 3,
  className = "",
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      initParticles()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (canvas.width / rect.width)
      const y = (e.clientY - rect.top) * (canvas.height / rect.height)
      mouseRef.current = { x, y, active: true }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * particleBaseSize + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          alpha: alphaParticles ? Math.random() * 0.5 + 0.5 : 1,
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Always apply base movement
        particle.baseX += particle.speedX
        particle.baseY += particle.speedY

        // Wrap base positions around edges
        if (particle.baseX < 0) particle.baseX = canvas.width
        if (particle.baseX > canvas.width) particle.baseX = 0
        if (particle.baseY < 0) particle.baseY = canvas.height
        if (particle.baseY > canvas.height) particle.baseY = 0

        // Set initial position to base position
        particle.x = particle.baseX
        particle.y = particle.baseY

        // Apply mouse repulsion if active
        if (mouseRef.current.active && moveParticlesOnHover) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 150

          if (distance < maxDistance) {
            // Strong repelling force
            const force = Math.pow((maxDistance - distance) / maxDistance, 2) * 15
            particle.x -= (dx / distance) * force
            particle.y -= (dy / distance) * force

            // Add some randomness to the movement
            particle.x += (Math.random() - 0.5) * 2
            particle.y += (Math.random() - 0.5) * 2
          }
        }

        // Draw particle with enhanced glow
        ctx.save()
        ctx.globalAlpha = particle.alpha
        
        // Outer glow
        ctx.shadowBlur = 20
        ctx.shadowColor = particle.color
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Inner bright core
        ctx.shadowBlur = 0
        ctx.globalAlpha = Math.min(1, particle.alpha + 0.2)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Setup
    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    animate()

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [particleCount, particleColors, speed, moveParticlesOnHover, alphaParticles, particleBaseSize])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        zIndex: 0,
        pointerEvents: "auto",
        mixBlendMode: "screen",
        touchAction: "none",
      }}
    />
  )
}

export default Particles 