import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Explanation from '@/components/Explanation'
import HowItWorks from '@/components/HowItWorks'
import Benefits from '@/components/Benefits'
import Zonas from '@/components/Zonas'
import Earnings from '@/components/Earnings'
import Testimonials from '@/components/Testimonials'
import RegistrationForm from '@/components/RegistrationForm'
import TermsAndConditions from '@/components/TermsAndConditions'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Explanation />
      <HowItWorks />
      <Benefits />
      <Zonas />
      <Earnings />
      <Testimonials />
      <RegistrationForm />
      <TermsAndConditions />
      <Footer />
    </main>
  )
}
