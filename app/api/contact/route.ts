import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

// Schéma de validation
const contactSchema = z.object({
  name: z.string().min(2, "Nom trop court").max(100),
  phone: z.string().min(8, "Numéro invalide").max(20),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Message trop court").max(2000),
})

// Transporteur Gmail (réutilisé entre les requêtes)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application Google
  },
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validation des données
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Données invalides", details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, phone, email, message } = result.data

    // Email reçu par l'entreprise
    await transporter.sendMail({
      from: `"Auxerre Carrelage - Site web" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nouvelle demande de devis de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #c8a96e; padding-bottom: 10px;">
            Nouvelle demande de devis
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold; width: 140px;">Nom</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Téléphone</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="tel:${phone}">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
          </table>
          <h3 style="color: #1a1a1a;">Projet décrit :</h3>
          <div style="background: #f9f9f9; padding: 15px; border-left: 3px solid #c8a96e; border-radius: 4px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            Message reçu le ${new Date().toLocaleDateString("fr-FR", {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
              hour: "2-digit", minute: "2-digit",
            })}
          </p>
        </div>
      `,
    })

    // Email de confirmation envoyé au client
    await transporter.sendMail({
      from: `"Auxerre Carrelage" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Votre demande de devis a bien été reçue",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #c8a96e; padding-bottom: 10px;">
            Merci pour votre demande, ${name} !
          </h2>
          <p style="color: #444; line-height: 1.6;">
            Nous avons bien reçu votre demande de devis et nous vous répondrons
            <strong>dans les 48 heures</strong>.
          </p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 3px solid #c8a96e; border-radius: 4px; margin: 20px 0;">
            <strong>Votre message :</strong><br><br>
            ${message.replace(/\n/g, "<br>")}
          </div>
          <p style="color: #444; line-height: 1.6;">
            En cas d'urgence, vous pouvez nous joindre directement au
            <a href="tel:+33386000000" style="color: #c8a96e;">03 86 00 00 00</a>.
          </p>
          <p style="color: #444;">
            Cordialement,<br>
            <strong>L'équipe Auxerre Carrelage</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #aaa; font-size: 11px;">
            12 Rue du Commerce, 89000 Auxerre — 
            <a href="mailto:contact@auxerre-carrelage.fr" style="color: #aaa;">contact@auxerre-carrelage.fr</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur envoi email:", error)
    return NextResponse.json(
      { error: "Erreur serveur, veuillez réessayer." },
      { status: 500 }
    )
  }
}
