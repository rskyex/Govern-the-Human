import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Thesis } from '@/components/thesis'
import { Layers } from '@/components/layers'
import { Suite } from '@/components/suite'
import { GovernanceGap } from '@/components/governance-gap'
import { Closing } from '@/components/closing'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      <Hero />
      <Thesis />
      <Layers />
      <Suite />
      <GovernanceGap />
      <Closing />
      <Footer />
    </div>
  )
}
