import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Gallery } from "@/components/gallery"
import { WhyUs } from "@/components/why-us"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
