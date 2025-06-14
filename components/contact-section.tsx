"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { HeroParticles } from "@/components/ui/particles-background"

interface ContactSectionProps {
  navigateToSection?: (sectionId: string) => void
}

export function ContactSection({ navigateToSection }: ContactSectionProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = React.useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("error")
      setIsSubmitting(false)
      return
    }

    try {

      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen w-full relative flex items-center py-20 px-4 md:px-8 bg-black">
      <HeroParticles />
      
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-[#9333EA]/5 blur-[100px] opacity-60" />
        <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-[#1b022c]/20 blur-[80px] opacity-50" />
      </div>

      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have a project idea, question, or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#2D0449]/20 backdrop-blur-md 
            rounded-2xl p-6 border border-violet-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]
            hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-500">
            
            {/* Contact Info */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-white/90 mb-4">Get in Touch</h2>
              <div className="space-y-3">
                {[
                  {
                    icon: <Mail className="h-6 w-6 text-purple-400" />,
                    title: "Email",
                    value: "haboc.carlajoy@gmail.com",
                    link: "mailto:haboc.carlajoy@gmail.com",
                  },
                  {
                    icon: <Phone className="h-6 w-6 text-purple-400" />,
                    title: "Phone",
                    value: "09953095304",
                  },
                  {
                    icon: <MapPin className="h-6 w-6 text-purple-400" />,
                    title: "Location",
                    value: "Pasig City",
                  },
                  {
                    icon: <Linkedin className="h-6 w-6 text-purple-400" />,
                    title: "LinkedIn",
                    value: "linkedin.com/in/cj-haboc",
                    link: "https://www.linkedin.com/in/cj-haboc/",
                  },
                  {
                    icon: <Github className="h-6 w-6 text-purple-400" />,
                    title: "GitHub",
                    value: "github.com/sidjey-y",
                    link: "https://github.com/sidjey-y",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-[#2D0449]/30 
                    border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300
                    hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] hover:scale-[1.02]"
                  >
                    {contact.icon}
                    <div>
                      <h3 className="text-white/90 font-medium">{contact.title}</h3>
                      {contact.link ? (
                        <Link
                          href={contact.link}
                          className="text-white/70 hover:text-purple-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contact.value}
                        </Link>
                      ) : (
                        <p className="text-white/70">{contact.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-2.5 rounded-lg bg-[#2D0449]/20 border border-violet-500/20 
                    focus:border-violet-500/40 text-white/90 placeholder-white/50 outline-none text-sm
                    focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                    transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2.5 rounded-lg bg-[#2D0449]/20 border border-violet-500/20 
                    focus:border-violet-500/40 text-white/90 placeholder-white/50 outline-none text-sm
                    focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                    transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                  <textarea
                    id="message"
                    placeholder="Type your message here"
                    rows={4}
                    className="w-full p-2.5 rounded-lg bg-[#2D0449]/20 border border-violet-500/20 
                    focus:border-violet-500/40 text-white/90 placeholder-white/50 outline-none text-sm
                    focus:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                    transition-all duration-300 resize-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#2D0449] rounded-lg text-white font-semibold 
                backdrop-blur-sm border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.3)]
                hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:border-violet-500/40
                transition-all duration-300 hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}