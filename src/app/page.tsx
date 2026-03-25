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
      <SectionDivider image="/img-panoramic-calm.png" objectPosition="object-bottom" />
      <Thesis />
      <SectionDivider image="/img-arches-reflective.png" objectPosition="object-center" />
      <ThreeLayerModel />
      <SectionDivider image="/img-hall-solitary.png" objectPosition="object-[center_40%]" />
      <Suite />
      <SectionDivider image="/img-fluid-abstract.png" objectPosition="object-center" />
      <GovernanceGap />
      <SectionDivider image="/img-portal-circular.png" objectPosition="object-[center_60%]" />
      <Closing />
      <Footer />
    </div>
  )
}
