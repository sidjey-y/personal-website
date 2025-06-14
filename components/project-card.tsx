"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    image?: string
    icon?: React.ReactNode
    link: string
    tags: string[]
    category: string
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <GlassCard 
        variant={index % 3 === 0 ? "default" : index % 3 === 1 ? "accent" : "secondary"}
        className="h-full flex flex-col overflow-hidden p-0"
        hoverEffect
        blurStrength="medium"
      >
        {/* Project Image/Icon */}
        <div className="relative h-56 overflow-hidden rounded-t-2xl">
          {project.image ? (
            <div className="relative h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 flex items-center justify-center dark:from-primary/20 dark:via-accent/10 dark:to-secondary/15">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                }}
                className="text-accent"
              >
                {project.icon}
              </motion.div>
            </div>
          )}
          
          {/* Hover overlay with link */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="z-20"
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-4 py-2 rounded-full flex items-center gap-2",
                  "backdrop-blur-[10px] bg-white/15 border border-white/20 hover:bg-white/25 hover:shadow-lg dark:bg-primary/30 dark:border-white/5 dark:hover:bg-primary/40 transition-all duration-300",
                  "relative z-30 pointer-events-auto"
                )}
              >
                View Project <ExternalLink size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground mb-6 flex-grow">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className={cn(
                  "backdrop-blur-[5px] bg-white/10 hover:bg-white/20 border-white/20 text-foreground px-3 py-1 rounded-full text-xs transition-colors dark:bg-primary/20 dark:border-white/10",
                  i === 0 && "bg-accent/20 border-accent/30 dark:bg-accent/30 dark:border-accent/40"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
} 