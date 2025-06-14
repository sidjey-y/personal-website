"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"
import { cn, glassmorphism } from "@/lib/utils"
import { HeartPulse, Wine, Code } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { GlassCard } from "@/components/ui/glass-card"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

interface ProjectsSectionProps {
  className?: string
  navigateToSection?: (sectionId: string) => void
}

export function ProjectsSection({ className, navigateToSection }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = React.useState("all")
  const [currentPage, setCurrentPage] = React.useState(1)
  const projectsPerPage = 3

  const projects = [
    {
      id: 1,
      title: "(A)I Plant",
      description:
        "An intelligent agriculture monitoring system that leverages artificial intelligence to provide real-time soil analysis, nutrient monitoring, and farming recommendations.",
      image: "/images/ai-plant-new.png",
      link: "https://github.com/sidjey-y/ai-plant",
      tags: ["AI", "IoT", "Agriculture"],
      category: "ai",
    },
    {
      id: 2,
      title: "WeAId",
      description:
        "A smart healthcare waiting system for efficient patient management, using AI to optimize waiting times and improve the patient experience.",
      image: "/images/weaid.png",
      link: "https://github.com/sidjey-y/weaid",
      tags: ["AI", "Healthcare", "Patient Management"],
      category: "ai",
    },
    {
      id: 3,
      title: "Mind The Polls",
      description:
        "An AI-powered election insights platform that analyzes voting patterns, predicts outcomes, and provides data visualization for election trends.",
      image: "/images/maind-new.png",
      link: "https://github.com/sidjey-y/ai-election-insights",
      tags: ["AI", "Data Analysis", "Visualization"],
      category: "ai",
    },
    {
      id: 4,
      title: "Roaster Chatbot",
      description:
        "A humorous chatbot that analyzes messaging patterns and responds with light-hearted roasts while dynamically updating a 'Roast-O-Meter' that tracks various attributes.",
      image: "/images/roaster-chatbot-new.png",
      link: "https://github.com/sidjey-y/roaster-chatbot",
      tags: ["NLP", "Chatbot", "Humor"],
      category: "ai",
    },
    {
      id: 5,
      title: "Predicting Dementia Status",
      description:
        "A machine learning model that predicts dementia status using the OASIS dataset, helping in early diagnosis and treatment planning.",
      icon: <HeartPulse className="h-16 w-16" />,
      link: "https://github.com/sidjey-y/dementia-ml",
      tags: ["Machine Learning", "Healthcare", "Data Science"],
      category: "ml",
    },
    {
      id: 6,
      title: "Wine Quality Prediction",
      description:
        "A machine learning model that predicts wine quality based on physicochemical properties, helping vintners improve their production processes.",
      icon: <Wine className="h-16 w-16" />,
      link: "https://github.com/sidjey-y/wine-quality-machine-learning",
      tags: ["Machine Learning", "Data Analysis", "Classification"],
      category: "ml",
    },
  ]

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter)
    
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  
  React.useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <section id="projects" className="min-h-screen w-full py-20 relative bg-black">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[#9333EA]/5 blur-[100px] opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-[#1b022c]/20 blur-[80px] opacity-50" />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Featured Work
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <p className="text-white/60 max-w-2xl mx-auto">
            A collection of my projects showcasing my skills and interests in AI, machine learning, and software development.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex p-1 rounded-full backdrop-blur-[10px] bg-white/15 border border-white/20 dark:bg-primary/30 dark:border-white/5">
            {["all", "ai", "ml"].map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeFilter === filter
                    ? "bg-accent text-white shadow-md"
                    : "hover:bg-white/10 dark:hover:bg-primary/40"
                )}
                whileHover={{ scale: activeFilter !== filter ? 1.05 : 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {filter === "all" ? "All Projects" : filter === "ai" ? "AI Projects" : "ML Projects"}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-[#2D0449]/20 border border-violet-500/20",
                "backdrop-blur-md transition-all duration-300",
                "hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:border-violet-500/40"
              )}
            >
              {/* Project Image */}
              <div className="relative w-full h-48 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : project.icon ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/10 to-purple-500/10">
                    {project.icon}
                  </div>
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D0449]/90 to-transparent 
                  group-hover:from-[#2D0449]/95 transition-all duration-300" />
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 group-hover:text-white/80 transition-colors duration-200">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20
                      group-hover:border-violet-500/40 group-hover:bg-violet-500/20 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-2 relative z-50">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110
                      hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] relative z-50 pointer-events-auto"
                    >
                      <Github className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Enhanced Glow Effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-violet-500/0 via-violet-500/20 to-violet-500/0 
                opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mt-12"
          >
            <div className="inline-flex p-1 rounded-full backdrop-blur-[10px] bg-white/5 border border-white/10">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  currentPage === 1 
                    ? "text-white/50 cursor-not-allowed"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                Previous
              </button>
              
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    currentPage === number
                      ? "bg-violet-500/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  currentPage === totalPages 
                    ? "text-white/50 cursor-not-allowed"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
} 