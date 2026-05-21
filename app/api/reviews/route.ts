import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

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

// Schéma de validation
const reviewSchema = z.object({
  name: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(10).max(1000),
  project: z.string().min(2).max(100),
})

// GET /api/reviews — retourne les avis approuvés
export async function GET() {
  const reviews = await readReviews()
  const approved = reviews
    .filter((r) => r.approved)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return NextResponse.json(approved)
}

// POST /api/reviews — soumet un nouvel avis (en attente de validation)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = reviewSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const reviews = await readReviews()
    const newReview: Review = {
      id: Date.now().toString(),
      ...result.data,
      approved: false, // en attente de validation
      createdAt: new Date().toISOString(),
    }

    reviews.push(newReview)
    await writeReviews(reviews)

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
