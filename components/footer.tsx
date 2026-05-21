import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#pourquoi-nous", label: "Pourquoi nous" },
  { href: "#avis", label: "Avis clients" },
  { href: "#contact", label: "Contact" },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl font-bold">
                Art de <span className="text-accent">Carrelage</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Expert en pose de carrelage, faïence et rénovation intérieure depuis plus de 10 ans à Cannes et ses environs.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+33386000000"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  06 28 72 63 68
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@auxerre-carrelage.fr"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  artdecarrelage@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>
                  7 bis chemin des gourguettes<br />
                  06150 Cannes la Bocca, France
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Horaires</h4>
            <ul className="space-y-3 text-primary-foreground/70">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span>8h - 18h</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span>9h - 12h</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© 2026 Art de Carrelage. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">
                Mentions légales
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
