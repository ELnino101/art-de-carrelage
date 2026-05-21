"use client"

import { motion } from "framer-motion"
import { Award, Heart, FileText, Clock, Shield } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Plus de 10 ans d'expérience",
    description: "Une expertise reconnue dans la pose de carrelage et la rénovation.",
  },
  {
    icon: Heart,
    title: "Travail soigné",
    description: "Attention aux détails et finitions impeccables sur chaque chantier.",
  },
  {
    icon: FileText,
    title: "Devis gratuit",
    description: "Estimation détaillée et transparente sans engagement de votre part.",
  },
  {
    icon: Clock,
    title: "Intervention rapide",
    description: "Disponibilité et réactivité pour démarrer votre projet rapidement.",
  },
  {
    icon: Shield,
    title: "Garantie qualité",
    description: "Travaux garantis et matériaux de qualité professionnelle.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
}

export function WhyUs() {
  return (
    <section id="pourquoi-nous" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
              Notre engagement
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
              Chez Art du Carrelage, nous mettons notre savoir-faire au service de vos projets. Notre équipe qualifiée vous accompagne de la conception à la réalisation, avec un souci constant de qualité et de satisfaction client.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <span className="font-serif text-4xl font-bold text-accent">500+</span>
                <p className="text-sm text-primary-foreground/70">Projets réalisés</p>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div>
                <span className="font-serif text-4xl font-bold text-accent">100%</span>
                <p className="text-sm text-primary-foreground/70">Clients satisfaits</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="flex gap-4 p-4 rounded-lg bg-primary-foreground/5 hover:bg-primary-foreground/10 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
