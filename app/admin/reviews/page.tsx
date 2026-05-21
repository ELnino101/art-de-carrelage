"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, Check, Trash2, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Review = {
  id: string
  name: string
  location: string
  rating: number
  text: string
  project: string
  approved: boolean
  createdAt: string
}

export default function AdminReviews() {
  const [secret, setSecret] = useState("")
  const [authenticated, setAuthenticated] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchReviews = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/reviews/admin?secret=${secret}`)
      if (res.status === 401) { setError("Mot de passe incorrect"); setAuthenticated(false); return }
      const data = await res.json()
      setReviews(data)
      setAuthenticated(true)
      setError("")
    } catch {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }, [secret])

  useEffect(() => {
    if (authenticated) fetchReviews()
  }, [authenticated, fetchReviews])

  const toggleApprove = async (id: string) => {
    await fetch(`/api/reviews/admin?secret=${secret}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchReviews()
  }

  const deleteReview = async (id: string) => {
    if (!confirm("Supprimer cet avis ?")) return
    await fetch(`/api/reviews/admin?secret=${secret}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchReviews()
  }

  const pending = reviews.filter((r) => !r.approved)
  const approved = reviews.filter((r) => r.approved)

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="font-serif text-2xl font-bold text-center">Administration des avis</h1>
          <Input
            type="password"
            placeholder="Mot de passe admin"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchReviews()}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button className="w-full" onClick={fetchReviews} disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl font-bold">Gestion des avis</h1>
          <Button variant="outline" size="sm" onClick={fetchReviews} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" /> Actualiser
          </Button>
        </div>

        {/* En attente */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            En attente de validation ({pending.length})
          </h2>
          {pending.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun avis en attente.</p>
          ) : (
            <div className="space-y-3">
              {pending.map((r) => <ReviewCard key={r.id} review={r} onApprove={toggleApprove} onDelete={deleteReview} />)}
            </div>
          )}
        </div>

        {/* Approuvés */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Publiés ({approved.length})
          </h2>
          {approved.length === 0 ? (
            <p className="text-muted-foreground text-sm">Aucun avis publié.</p>
          ) : (
            <div className="space-y-3">
              {approved.map((r) => <ReviewCard key={r.id} review={r} onApprove={toggleApprove} onDelete={deleteReview} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReviewCard({ review, onApprove, onDelete }: {
  review: Review
  onApprove: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <Card className={review.approved ? "border-green-200" : "border-orange-200"}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="font-semibold">{review.name}</span>
              <span className="text-muted-foreground text-sm">— {review.location}</span>
              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{review.project}</span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
              ))}
            </div>
            <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(review.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              variant={review.approved ? "outline" : "default"}
              onClick={() => onApprove(review.id)}
            >
              <Check className="h-4 w-4" />
              {review.approved ? "Dépublier" : "Approuver"}
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete(review.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
