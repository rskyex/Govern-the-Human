import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Thesis } from '@/components/thesis'
import { ThreeLayerModel } from '@/components/three-layer-model'
import { Suite } from '@/components/suite'
import { GovernanceGap } from '@/components/governance-gap'
import { Closing } from '@/components/closing'
import { Footer } from '@/components/footer'
import { SectionDivider } from '@/components/section-divider'

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      <Hero />
      <SectionDivider />
      <Thesis />
      <SectionDivider />
      <ThreeLayerModel />
      <SectionDivider />
      <Suite />
      <SectionDivider />
      <GovernanceGap />
      <SectionDivider />
      <Closing />
      <Footer />
    </div>
  )
}
