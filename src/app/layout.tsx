import type { Metadata } from 'next'
import './globals.css'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://govern-the-human.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Govern the Human',
  description:
    'A research project on second-order AI governance, subject formation, and the human under AI conditions.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Govern the Human',
    description:
      'AI governance asks what systems do. This project asks what they do to the human subject.',
    url: siteUrl,
    siteName: 'Govern the Human',
    images: [
      {
        url: `${siteUrl}/govern-the-human-og.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Govern the Human',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Govern the Human',
    description:
      'AI governance asks what systems do. This project asks what they do to the human subject.',
    images: [
      {
        url: `${siteUrl}/govern-the-human-og.png`,
        width: 1200,
        height: 630,
        alt: 'Govern the Human',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
