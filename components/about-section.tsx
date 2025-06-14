"use client"

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/ui/spotlight-card";
import { HeroParticles } from "@/components/ui/particles-background";
import { Code, Heart, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen w-full flex items-center relative py-20 px-4 md:px-8 bg-black">
      <HeroParticles />
      
      {/* Background gradients */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/3 -left-1/4 w-[50rem] h-[50rem] rounded-full bg-[#9333EA]/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 -right-1/4 w-[50rem] h-[50rem] rounded-full bg-[#1b022c]/20 blur-[100px] animate-pulse" />
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">
              Get to Know Me
            </h2>
            
            <p className="text-white/60 max-w-2xl mx-auto">
              A passionate Computer Science student with a focus on AI and community building.
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative"
            >
              <SpotlightCard 
                className="overflow-hidden"
                spotlightColor="rgba(147, 51, 234, 0.2)"
              >
                <div className="relative aspect-square">
                  <img
                    src="/images/about-me-new.jpeg"
                    alt="Sidjey at Philippine Tech Career Fest"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Right Column - Content Cards */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <SpotlightCard 
                  className="border-purple-500/20"
                  spotlightColor="rgba(147, 51, 234, 0.15)"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Code className="h-5 w-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">About Me</h3>
                    </div>
                    <p className="text-gray-300">
                      I'm a Computer Science student at UP Manila, learning with a focus on statistical computing. 
                      I'm grateful for the opportunities I've had to grow and be recognized for my efforts.
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <SpotlightCard 
                  className="border-purple-500/20"
                  spotlightColor="rgba(147, 51, 234, 0.15)"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Heart className="h-5 w-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">My Passion</h3>
                    </div>
                    <p className="text-gray-300">
                      I care deeply about AI and machine learning, especially their potential to make a positive difference. 
                      I hope to use what I learn to help others and give back in meaningful ways.
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <SpotlightCard 
                  className="border-purple-500/20"
                  spotlightColor="rgba(147, 51, 234, 0.15)"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Users className="h-5 w-5 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Community Involvement</h3>
                    </div>
                    <p className="text-gray-300">
                      I'm involved in organizing tech events and communities on campus, where I get to learn with others, 
                      support new learners, and help build a more inclusive space for growth.
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 