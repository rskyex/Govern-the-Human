'use client'

import { useEffect, useState } from 'react'
import { ClientPage } from '@/components/client-page'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-base" />
  }

  return <ClientPage />
}
