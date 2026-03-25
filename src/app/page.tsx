import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { SectionPlaceholder } from '@/components/section-placeholder'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-base">
      <Header />
      <Hero />
      <SectionPlaceholder number="01" label="Thesis" bg="base" />
      <SectionPlaceholder number="02" label="Three-Layer Model" bg="surface" />
      <SectionPlaceholder number="03" label="The Suite" bg="base" />
      <SectionPlaceholder number="04" label="Governance Gap" bg="surface" />
      <SectionPlaceholder number="05" label="Closing" bg="base" />
      <Footer />
    </div>
  )
}
