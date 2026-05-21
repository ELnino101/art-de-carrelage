"use client"

import { motion } from "framer-motion"
import { Grid3X3, Bath, TreePine, Square, Wrench, ChefHat } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Grid3X3,
    title: "Pose de carrelage",
    description: "Installation professionnelle de carrelage sol et mur pour tous types d'espaces.",
  },
  {
    icon: Bath,
    title: "Salle de bain",
    description: "Rénovation complète et création de salles de bain modernes et fonctionnelles.",
  },
  {
    icon: TreePine,
    title: "Terrasse extérieure",
    description: "Aménagement de terrasses avec des matériaux résistants aux intempéries.",
  },
  {
    icon: Square,
    title: "Faïence murale",
    description: "Pose de faïence décorative pour sublimer vos murs intérieurs.",
  },
  {
    icon: Wrench,
    title: "Rénovation",
    description: "Rénovation complète de vos sols et murs avec des finitions soignées.",
  },
  {
    icon: ChefHat,
    title: "Cuisine",
    description: "Carrelage et crédences pour des cuisines esthétiques et pratiques.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Nos prestations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Une expertise complète pour tous vos projets de carrelage et rénovation intérieure.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="group h-full bg-card border-border hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                    <service.icon className="h-7 w-7 text-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
