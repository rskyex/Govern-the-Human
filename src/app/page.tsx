import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Premise } from '@/components/premise'
import { Domains } from '@/components/domains'
import { Framework } from '@/components/framework'
import { Closing } from '@/components/closing'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      <Hero />
      <Premise />
      <Domains />
      <Framework />
      <Closing />
      <Footer />
    </div>
  )
}
