import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Govern the Human',
  description:
    'A research project on second-order AI governance, subject formation, and the human under AI conditions.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Govern the Human',
    description:
      'AI governance asks what systems do. This project asks what they do to the human subject.',
    images: [{ url: '/govern the human og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
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
