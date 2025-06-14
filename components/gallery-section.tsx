"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { GalleryParticles } from "@/components/ui/particles-background"
import { Button } from "@/components/ui/button"


interface GallerySectionProps {
  onNextPage?: () => void
  navigateToSection?: (sectionId: string) => void
}

type CategoryType = 'events' | 'hackathons' | 'life';

type SubCategory = 
  | 'bwai' 
  | 'bpi' 
  | 'nexhire' 
  | 'globe' 
  | 'blockchain' 
  | 'tedx' 
  | 'echelon' 
  | 'hackathon' 
  | 'life';

interface GalleryImage {
  src: string;
  alt: string;
  category: CategoryType;
  subCategory: SubCategory;
  eventTitle: string;
  description: string;
  date?: string; 
}

export function GallerySection({ onNextPage, navigateToSection }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('events');

  const galleryImages: GalleryImage[] = [
    // 1. Google Developer Groups Manila - Build With AI
    {
      src: "/images/Events/bwai/bwai-1.jpg",
      alt: "Build With AI - Opening Ceremony",
      category: "events",
      subCategory: "bwai",
      eventTitle: "Google Developer Groups Manila - Build With AI",
      description: "Led by Google's seasoned experts and learn more about Generative AI technologies"
    },
    {
      src: "/images/Events/bwai/bwai-2.jpg",
      alt: "Build With AI - Workshop Session",
      category: "events",
      subCategory: "bwai",
      eventTitle: "Google Developer Groups Manila - Build With AI",
      description: "Interactive workshop on AI development and implementation"
    },
    {
      src: "/images/Events/bwai/bwai-3.jpg",
      alt: "Build With AI - Group Discussion",
      category: "events",
      subCategory: "bwai",
      eventTitle: "Google Developer Groups Manila - Build With AI",
      description: "Collaborative learning and knowledge sharing"
    },
    {
      src: "/images/Events/bwai/bwai-4.jpg",
      alt: "Build With AI Group Session",
      category: "events",
      subCategory: "bwai",
      eventTitle: "Google Developer Groups Manila - Build With AI",
      description: "Led by Google's seasoned experts and learn more about Generative AI technologies"
    },
    {
      src: "/images/Events/bwai/bwai-5.jpg",
      alt: "Build With AI Collaboration",
      category: "events",
      subCategory: "bwai",
      eventTitle: "Google Developer Groups Manila - Build With AI",
      description: "Led by Google's seasoned experts and learn more about Generative AI technologies"
    },
    {
      src: "/images/Events/bwai/bwai-6.jpg",
      alt: "Build With AI Team",
      category: "events",
      subCategory: "bwai",
      eventTitle: "Google Developer Groups Manila - Build With AI",
      description: "Led by Google's seasoned experts and learn more about Generative AI technologies"
    },
    {
      src: "/images/Events/bwai/bwai-7.jpg",
      alt: "Build With AI Community",
      category: "events",
      subCategory: "bwai",
      eventTitle: "Google Developer Groups Manila - Build With AI",
      description: "Led by Google's seasoned experts to learn more about Generative AI technologies"
    },

    // 2. BPI Stellar Student Summit
    {
      src: "/images/Events/bpi/Stellar-1.jpg",
      alt: "BPI Stellar Summit - Opening Day",
      category: "events",
      subCategory: "bpi",
      eventTitle: "BPI Stellar Student Summit Year 2",
      description: ""
    },
    {
      src: "/images/Events/bpi/Stellar-2.jpg",
      alt: "BPI Stellar Summit",
      category: "events",
      subCategory: "bpi",
      eventTitle: "BPI Stellar Student Summit",
      description: ""
    },
    {
      src: "/images/Events/bpi/Stellar-3.jpg",
      alt: "BPI Stellar Summit",
      category: "events",
      subCategory: "bpi",
      eventTitle: "BPI Stellar Student Summit",
      description: ""
    },

    // 3. NexHire - Philippine Tech Career Fest
    {
      src: "/images/Events/nexhire/nexhire-1.jpg",
      alt: "NexHire Career Fest - Main Stage",
      category: "events",
      subCategory: "nexhire",
      eventTitle: "NexHire - Philippine Tech Career Fest",
      description: "Tech career festival"
    },
    {
      src: "/images/Events/nexhire/nexhire-2.jpg",
      alt: "NexHire - Networking Session",
      category: "events",
      subCategory: "nexhire",
      eventTitle: "NexHire Career Fair",
      description: "Networking with industry professionals and tech companies"
    },
    {
      src: "/images/Events/nexhire/nexhire-3.jpg",
      alt: "NexHire - Tech Talks",
      category: "events",
      subCategory: "nexhire",
      eventTitle: "NexHire Tech Talks",
      description: "Industry leaders sharing insights on tech careers!"
    },

    // 4. Globe - Fusion of D.AI.TA
    {
      src: "/images/Events/globe/globe-1.jpg",
      alt: "Globe D.AI.TA - Opening Session",
      category: "events",
      subCategory: "globe",
      eventTitle: "Globe - Fusion of D.AI.TA",
      description: "Exploring the future of AI and data analytics"
    },
    {
      src: "/images/Events/globe/globe-2.jpg",
      alt: "Globe D.AI.TA - Workshop",
      category: "events",
      subCategory: "globe",
      eventTitle: "Globe AI Workshop",
      description: "Hands-on experience with AI technologies, using Google AI Tools/Google Console"
    },
    {
      src: "/images/Events/globe/globe-3.jpg",
      alt: "Globe D.AI.TA - Panel Discussion",
      category: "events",
      subCategory: "globe",
      eventTitle: "Globe D.AI.TA Insights",
      description: "Workshop on data science and AI applications"
    },
    {
      src: "/images/Events/globe/globe-4.jpg",
      alt: "Globe D.AI.TA - Innovation Showcase",
      category: "events",
      subCategory: "globe",
      eventTitle: "Globe D.AI.TA Innovation",
      description: ""
    },

    // 5. Philippine Block Chain Week
    {
      src: "/images/Events/pbc/pbc-1.jpg",
      alt: "Philippine Blockchain Week",
      category: "events",
      subCategory: "blockchain",
      eventTitle: "Philippine Block Chain Week",
      description: "Exploring the future of Web3 and blockchain technology"
    },
    {
      src: "/images/Events/pbc/pbc-2.jpg",
      alt: "Blockchain Workshop",
      category: "events",
      subCategory: "blockchain",
      eventTitle: "Web3 Workshop",
      description: "Learning about blockchain development and applications"
    },
    {
      src: "/images/Events/pbc/pbc-3.jpg",
      alt: "Blockchain Networking",
      category: "events",
      subCategory: "blockchain",
      eventTitle: "Web3 Community",
      description: "Connecting with blockchain enthusiasts and developers"
    },

    // 6. TedxUPV Women
    {
      src: "/images/photo14.jpeg",
      alt: "TedxUPV Women Anchored in Tech",
      category: "events",
      subCategory: "tedx",
      eventTitle: "TedxUPV Women Anchored in Tech",
      description: "TedxUPV Women Anchored in Tech"
    },

    // 7. Echelon Philippines
    {
      src: "/images/photo15.jpeg",
      alt: "Echelon Philippines",
      category: "events",
      subCategory: "echelon",
      eventTitle: "Echelon Philippines",
      description: "Echelon Philippines Tech Event"
    },

    // Hackathons
    {
      src: "/images/hackathons/hackathon-1.jpg",
      alt: "Hackathon Opening Ceremony",
      category: "hackathons",
      subCategory: "hackathon",
      eventTitle: "Tech Innovation Hackathon",
      description: "Kickoff of the hackathon challenge"
    },
    {
      src: "/images/hackathons/hackathon-2.jpg",
      alt: "Meet the Team <3",
      category: "hackathons",
      subCategory: "hackathon",
      eventTitle: "Hackathon Team Work",
      description: ""
    },
    {
      src: "/images/hackathons/hackathon-3.jpeg",
      alt: "Pitching",
      category: "hackathons",
      subCategory: "hackathon",
      eventTitle: "Hackathon Project",
      description: ""
    },
    {
      src: "/images/hackathons/hackathon-4.jpg",
      alt: "With the Judges",
      category: "hackathons",
      subCategory: "hackathon",
      eventTitle: "Hackathon Team Discussion",
      description: ""
    },
    {
      src: "/images/hackathons/hackathon-5.jpg",
      alt: "Project Presentation",
      category: "hackathons",
      subCategory: "hackathon",
      eventTitle: "Hackathon Final Presentation",
      description: ""
    },

    // Life Events
    {
      src: "/images/photo1.jpeg",
      alt: "SoComSci's Tech Week",
      category: "life",
      subCategory: "life",
      eventTitle: "SoComSci's Tech Week",
      description: "SoComSci's Tech Week - Host"
    },
    {
      src: "/images/photo3.jpeg",
      alt: "Google Developer Groups Merchandise",
      category: "life",
      subCategory: "life",
      eventTitle: "Google Developer Groups Merchandise",
      description: "Merch received given by Google for campus organizers/leads"
    },
    {
      src: "/images/photo9.jpeg",
      alt: "GDGoC UP Manila First IGP",
      category: "life",
      subCategory: "life",
      eventTitle: "GDGoC UP Manila First IGP",
      description: "GDGoC UP Manila first IGP and Merch booth"
    },
    {
      src: "/images/photo12.jpeg",
      alt: "SONDER 2025",
      category: "life",
      subCategory: "life",
      eventTitle: "SONDER 2025",
      description: "SONDER 2025 - External Lead, Virtual Tour with Vietnam and Indonesia"
    },
    {
      src: "/images/Events/AIESEC in UP Manila.png",
      alt: "AIESEC Leadership Role",
      category: "life",
      subCategory: "life",
      eventTitle: "AIESEC in UP Manila",
      description: ""
    }
  ]
  
  const categories = {
    events: {
      title: "Tech Events",
      description: "",
      subcategories: {
        bwai: {
          title: "Build With AI - GDG Manila",
          description: "Invited to Google Developer Groups Manila's Build with AI Workshop 2025"
        },
        bpi: {
          title: "BPI Stellar Summit",
          description: "Invited to BPI Stellar Student Summit Year 2"
        },
        nexhire: {
          title: "Philippine Career Fest by NexHire",
          description: "In partnership with GDG on Campus UP Manila"
        },
        globe: {
          title: "Globe D.AI.TA",
          description: "Globe's Data and AI Technology Workshop, using Google AI Tools/Google Console"
        },
        blockchain: {
          title: "Philippine Blockchain Week",
          description: "Web3 and blockchain technology event"
        },
        tedx: {
          title: "TEDxUPV Women",
          description: "Ideas worth spreading from women in tech"
        },
        echelon: {
          title: "Echelon Philippines",
          description: "Echelon Philippines Tech Event"
        }
      }
    },
    hackathons: {
      title: "Hackathons",
      description: ""
    },
    life: {
      title: "Life Events",
      description: ""
    }
  };

  const filteredImages = useMemo(() => {
    return galleryImages.filter(image => image.category === activeCategory);
  }, [activeCategory]);

  const groupedImages = useMemo(() => {
    return filteredImages.reduce((acc, image) => {
      const key = image.subCategory;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(image);
      return acc;
    }, {} as Record<string, typeof filteredImages>);
  }, [filteredImages]);

  return (
    <section id="gallery" className="w-full min-h-screen py-20 relative overflow-hidden">
      <GalleryParticles />
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#1b022c]/30 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#9333EA]/20 blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Captured Moments
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-purple-500 to-purple-700 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Some of my memorable moments!
          </p>
        </div>
        
        <div className="flex justify-center gap-6 mb-16">
          {Object.entries(categories).map(([key, category]) => (
            <div
              key={key}
              className={cn(
                "relative group cursor-pointer px-6 py-3 rounded-lg transition-all duration-300",
                activeCategory === key 
                  ? "bg-white/10 backdrop-blur-sm border border-white/20" 
                  : "hover:bg-white/5"
              )}
              onClick={() => setActiveCategory(key as CategoryType)}
            >
              <div className="text-center">
                <h3 className={cn(
                  "text-xl font-semibold mb-1 transition-colors",
                  activeCategory === key 
                    ? "text-purple-400" 
                    : "text-white/80 group-hover:text-purple-400"
                )}>
                  {category.title}
                </h3>
              </div>
              {activeCategory === key && (
                <div className="absolute -bottom-px left-0 right-0 h-[2px] bg-gradient-to-r from-purple-400 to-purple-600" />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-20">
          {Object.entries(groupedImages).map(([subCategory, images]) => {
            const categoryInfo = categories[activeCategory as keyof typeof categories];
            const subcategoryInfo = 
              'subcategories' in categoryInfo 
                ? (categoryInfo as typeof categories.events).subcategories[subCategory as keyof typeof categories.events.subcategories]
                : null;

            return (
              <div key={subCategory} className="relative">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                    {subcategoryInfo?.title || images[0].eventTitle}
                  </h3>
                  <p className="text-white/60">
                    {subcategoryInfo?.description || images[0].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-500"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index < 4}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-purple-400 text-sm mb-2">{image.date}</p>
                          <h4 className="text-white font-semibold text-lg mb-2">{image.alt}</h4>
                          <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center backdrop-blur-lg"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl w-full mx-4" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-purple-500/20 text-white/90 hover:bg-purple-500/40 transition-colors backdrop-blur-sm border border-white/10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 rounded-b-xl">
                <h3 className="text-purple-400 text-3xl font-bold mb-3">
                  {selectedImage.eventTitle}
                </h3>
                <p className="text-white/90 text-xl mb-2">
                  {selectedImage.alt}
                </p>
                <p className="text-white/70 text-lg">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 
