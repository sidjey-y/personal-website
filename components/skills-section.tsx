"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Code, Brain, Database, Gamepad, Users, Layout } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui/glass-card"
import SpotlightCard from "@/components/ui/spotlight-card"
import { HeroParticles } from "@/components/ui/particles-background"

interface SkillCategory {
  title: string
  description: string
  icon: React.ReactNode
  skills: {
    name: string
    logo?: string
  }[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Core languages I use for development.",
    icon: <Code className="w-6 h-6" />,
    skills: [
      { name: "Python", logo: "/images/skills/python.svg" },
      { name: "JavaScript", logo: "/images/skills/javascript.svg" },
      { name: "Java", logo: "/images/skills/java.svg" },
      { name: "C++", logo: "/images/skills/cpp.svg" },
      { name: "PHP", logo: "/images/skills/php.svg" },
      { name: "R", logo: "/images/skills/r.svg" },
    ]
  },
  {
    title: "AI & ML",
    description: "Tools and frameworks for artificial intelligence.",
    icon: <Brain className="w-6 h-6" />,
    skills: [
      { name: "TensorFlow", logo: "/images/skills/tensorflow.svg" },
      { name: "PyTorch", logo: "/images/skills/pytorch.svg" },
      { name: "Scikit-learn", logo: "/images/skills/scikit.svg" },
      { name: "Pandas", logo: "/images/skills/pandas.svg" },
      { name: "OpenCV", logo: "/images/skills/opencv.svg" },
      { name: "NLTK", logo: "/images/skills/nltk.svg" },
    ]
  },
  {
    title: "Full-Stack Development",
    description: "Web development technologies and frameworks.",
    icon: <Layout className="w-6 h-6" />,
    skills: [
      { name: "React.js", logo: "/images/skills/react.svg" },
      { name: "Laravel", logo: "/images/skills/laravel.svg" },
      { name: "Node.js", logo: "/images/skills/nodejs.svg" },
      { name: "Vue.js", logo: "/images/skills/vue.svg" },
      { name: "HTML5", logo: "/images/skills/html5.svg" },
      { name: "Tailwind", logo: "/images/skills/tailwind.svg" },
    ]
  },
  {
    title: "Databases & Backend",
    description: "Managing data storage and server-side operations.",
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: "PostgreSQL", logo: "/images/skills/postgresql.svg" },
      { name: "MongoDB", logo: "/images/skills/mongodb.svg" },
      { name: "MySQL", logo: "/images/skills/mysql.svg" },
      { name: "Firebase", logo: "/images/skills/firebase.svg" },
      { name: "RESTful APIs", logo: "/images/skills/api.svg" },
      { name: "Spring", logo: "/images/skills/spring.svg" },
    ]
  },
  {
    title: "Game Development",
    description: "Creating interactive gaming experiences.",
    icon: <Gamepad className="w-6 h-6" />,
    skills: [
      { name: "Unity", logo: "/images/skills/unity.svg" },
      { name: "C#", logo: "/images/skills/csharp.svg" },
      { name: "Game Mechanics", logo: "/images/skills/unity.svg" },
      { name: "Animation", logo: "/images/skills/unity.svg" },
    ]
  },
  {
    title: "Leadership & Management",
    description: "Leading teams and managing projects effectively.",
    icon: <Users className="w-6 h-6" />,
    skills: [
      { name: "Team Leadership", logo: "/images/skills/management.svg" },
      { name: "Project Management", logo: "/images/skills/management.svg" },
      { name: "Analytical Thinking", logo: "/images/skills/analysis.svg" },
      { name: "Public Speaking", logo: "/images/skills/management.svg" },
      { name: "Problem-Solving", logo: "/images/skills/analysis.svg" },
    ]
  }
]

interface SkillsSectionProps {
  className?: string
  navigateToSection?: (sectionId: string) => void
}

export function SkillsSection({ className, navigateToSection }: SkillsSectionProps) {
  return (
    <section 
      id="skills" 
      className={cn(
        "min-h-screen w-full py-20 px-4 md:px-8 relative bg-black",
        className
      )}
    >
      <HeroParticles />
      
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-[30%] left-[10%] w-64 h-64 bg-[#9333EA]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 bg-[#1b022c]/20 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              What I Bring to the Table
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          
          <p className="text-white/60 max-w-2xl mx-auto">
            I've developed a set of technical and leadership skills throughout my academic journey!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <SpotlightCard 
                className="h-full transition-all duration-300 hover:scale-[1.02] group"
                spotlightColor="rgba(147, 51, 234, 0.2)"
              >
                <div className="p-6 relative">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/10 group-hover:to-purple-500/5 transition-all duration-500" />
                  
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {category.description}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                          className="flex items-center gap-2 group/skill"
                        >
                          {skill.logo ? (
                            <div className="relative w-5 h-5 group-hover/skill:scale-110 transition-transform">
                              <Image
                                src={skill.logo}
                                alt={skill.name}
                                fill
                                className="object-contain drop-shadow-[0_0_0.3rem_#ffffff70] group-hover/skill:drop-shadow-[0_0_0.5rem_#9333EA90]"
                              />
                            </div>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-accent/50 group-hover/skill:bg-accent/70 group-hover/skill:shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
                          )}
                          <span className="text-sm text-gray-300 group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 