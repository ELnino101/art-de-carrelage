import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const REVIEWS_FILE = path.join(process.cwd(), "data", "reviews.json")

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

async function readReviews(): Promise<Review[]> {
  try {
    const content = await fs.readFile(REVIEWS_FILE, "utf-8")
    return JSON.parse(content)
  } catch {
    return []
  }
}

async function writeReviews(reviews: Review[]) {
  await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8")
}

// GET /api/reviews/admin — tous les avis (avec mot de passe)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }
  const reviews = await readReviews()
  return NextResponse.json(reviews.sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ))
}

// PATCH /api/reviews/admin — approuver un avis
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { id } = await req.json()
  const reviews = await readReviews()
  const review = reviews.find((r) => r.id === id)
  if (!review) return NextResponse.json({ error: "Avis introuvable" }, { status: 404 })

  review.approved = !review.approved
  await writeReviews(reviews)
  return NextResponse.json({ success: true, approved: review.approved })
}

// DELETE /api/reviews/admin — supprimer un avis
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get("secret") !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { id } = await req.json()
  const reviews = await readReviews()
  const filtered = reviews.filter((r) => r.id !== id)
  await writeReviews(filtered)
  return NextResponse.json({ success: true })
}
