"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    id: 1,
    before: "/images/before-1.jpg",
    after: "/images/after-1.jpg",
    title: "Salle de bain moderne",
    description: "Transformation complète avec carrelage marbré",
  },
  {
    id: 2,
    before: "/images/before-2.jpg",
    after: "/images/after-2.jpg",
    title: "Salon contemporain",
    description: "Nouveau sol en grès cérame effet bois",
  },
]

const galleryImages = [
  { src: "/images/hero-tiling.jpg", alt: "Salle de bain luxueuse" },
  { src: "/images/kitchen.jpg", alt: "Cuisine moderne" },
  { src: "/images/terrace.jpg", alt: "Terrasse extérieure" },
  { src: "/images/after-1.jpg", alt: "Rénovation salle de bain" },
]

export function Gallery() {
  const [activeProject, setActiveProject] = useState(0)
  const [showAfter, setShowAfter] = useState<Record<number, boolean>>({})

  const toggleBeforeAfter = (projectId: number) => {
    setShowAfter((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }

  return (
    <section id="realisations" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Portfolio
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nos réalisations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Découvrez nos projets et transformations avant/après.
          </p>
        </motion.div>

        {/* Before/After Section */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
            Avant / Après
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div
                  className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => toggleBeforeAfter(project.id)}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showAfter[project.id] ? "after" : "before"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={showAfter[project.id] ? project.after : project.before}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Label */}
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    {showAfter[project.id] ? "Après" : "Avant"}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                      Cliquez pour voir {showAfter[project.id] ? "avant" : "après"}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-serif text-lg font-semibold text-foreground">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div>
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
            Galerie photos
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative aspect-square rounded-lg overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium">
                    {image.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
