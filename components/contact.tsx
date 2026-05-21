"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || "Erreur inconnue")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Veuillez réessayer."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-4">
            Contactez-nous
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Demandez votre devis gratuit
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Décrivez-nous votre projet et recevez une estimation personnalisée sous 48h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <div className="bg-secondary rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  Message envoyé !
                </h3>
                <p className="text-muted-foreground">
                  Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jean Dupont"
                      required
                      className="bg-card"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      required
                      className="bg-card"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jean.dupont@email.com"
                    required
                    className="bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Décrivez votre projet</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre projet de carrelage, les dimensions, le type de pièce..."
                    rows={5}
                    required
                    className="bg-card resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-4 py-3">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer ma demande
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Nos coordonnées
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Phone className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Téléphone</p>
                    <a
                      href="tel:+33386000000"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      +33 6 28 72 63 68
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Mail className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      href="mailto:contact@auxerre-carrelage.fr"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      artducarrelage06@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adresse</p>
                    <p className="text-muted-foreground">
                      7 bis chemin des gourguettes<br />
                      06150 Cannes la Bocca, France
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    <Clock className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Horaires</p>
                    <p className="text-muted-foreground">
                      Lun - Ven : 8h00 - 18h00<br />
                      Samedi : 9h00 - 12h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-lg overflow-hidden h-64 bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Zone d&apos;intervention : Cannes et environs (30km)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
