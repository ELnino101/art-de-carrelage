"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, Quote, PenLine, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type Review = {
  id: string
  name: string
  location: string
  rating: number
  text: string
  project: string
  createdAt: string
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          className="focus:outline-none"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              i < (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [rating, setRating] = useState(0)

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(setReviews)
      .catch(() => {})
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (rating === 0) { setError("Veuillez choisir une note."); return }
    setSubmitting(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      project: formData.get("project") as string,
      text: formData.get("text") as string,
      rating,
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="avis" className="py-24 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Témoignages
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Avis clients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            La satisfaction de nos clients est notre meilleure récompense.
          </p>
        </motion.div>

        {/* Grille des avis */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {reviews.map((review) => (
            <motion.div key={review.id} variants={itemVariants}>
              <Card className="h-full bg-card border-border hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-accent/30 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed">"{review.text}"</p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.location} • {review.project}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bouton laisser un avis */}
        {!showForm && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowForm(true)}
              className="gap-2"
            >
              <PenLine className="h-4 w-4" />
              Laisser un avis
            </Button>
          </div>
        )}

        {/* Formulaire */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto"
          >
            <Card className="bg-card">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-serif text-xl font-semibold">Votre avis</h3>
                  <button onClick={() => { setShowForm(false); setSubmitted(false) }}>
                    <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>

                {submitted ? (
                  <div className="text-center py-6">
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">Merci pour votre avis !</h4>
                    <p className="text-muted-foreground text-sm">
                      Il sera publié après validation, généralement sous 24h.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label>Votre note</Label>
                      <StarRating value={rating} onChange={setRating} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" name="name" placeholder="Jean Dupont" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Ville</Label>
                        <Input id="location" name="location" placeholder="Auxerre" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="project">Type de travaux</Label>
                      <Input id="project" name="project" placeholder="Salle de bain, terrasse..." required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="text">Votre commentaire</Label>
                      <Textarea
                        id="text"
                        name="text"
                        placeholder="Décrivez votre expérience..."
                        rows={4}
                        required
                        className="resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-4 py-2">
                        {error}
                      </p>
                    )}

                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Envoi en cours..." : "Envoyer mon avis"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}
