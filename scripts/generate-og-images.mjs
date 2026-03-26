/**
 * Generate static OG images for all pages.
 * Run: node scripts/generate-og-images.mjs
 */
import { ImageResponse } from '@vercel/og'
import { writeFile, readFile } from 'fs/promises'

const PAGES = [
  {
    slug: 'home',
    output: 'public/og-image.png',
    label: 'Research Project',
    title: 'Govern the Human',
    subtitle:
      'AI governance asks what systems do. This project asks what they do to the human subject.',
    footer: 'governthehuman.org',
    titleSize: '72px',
  },
  {
    slug: 'builder',
    output: 'public/og-builder.png',
    label: 'Builder',
    title: 'Risa Koyanagi',
    subtitle:
      'Cambridge Future Scholar. Researcher at the intersection of international security, space governance, and emerging technology governance.',
    footer: 'Govern the Human',
    titleSize: '72px',
  },
  {
    slug: 'narrative-drift',
    output: 'public/og-narrative-drift.png',
    label: 'Suite / 03',
    title: 'Narrative Drift',
    subtitle:
      'An investigation into how algorithmic curation restructures personal memory, narrative coherence, and the temporal continuity required for self-governance.',
    footer: 'Govern the Human',
    titleSize: '72px',
  },
  {
    slug: 'observatory',
    output: 'public/og-observatory.png',
    label: 'Suite / 01',
    title: 'Ontological Governance Observatory',
    subtitle:
      'A diagnostic framework for tracking how AI systems alter the foundational categories that governance presupposes.',
    footer: 'Govern the Human',
    titleSize: '56px',
  },
  {
    slug: 'selftrace',
    output: 'public/og-selftrace.png',
    label: 'Suite / 02',
    title: 'SelfTrace',
    subtitle:
      'A reflective instrument for examining how AI-mediated environments reshape self-perception, memory, and the continuity of personal identity.',
    footer: 'Govern the Human',
    titleSize: '72px',
  },
]

// Use local system fonts
const serifData = await readFile('/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf')
const sansData = await readFile('/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf')

for (const page of PAGES) {
  const response = new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#ffffff',
          position: 'relative',
        },
        children: [
          // Top accent line
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background:
                  'linear-gradient(to right, rgba(140,155,175,0.3), rgba(140,155,175,0.08))',
              },
            },
          },
          // Content
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '24px' },
              children: [
                // Label
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Liberation Sans"',
                      fontSize: '13px',
                      fontWeight: 400,
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: '#7d8291',
                    },
                    children: page.label,
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"DejaVu Serif"',
                      fontSize: page.titleSize,
                      fontWeight: 700,
                      lineHeight: 1.1,
                      letterSpacing: '-0.01em',
                      color: '#0e1117',
                    },
                    children: page.title,
                  },
                },
                // Rule
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '48px',
                      height: '1px',
                      backgroundColor: 'rgba(0,0,0,0.09)',
                      marginTop: '8px',
                      marginBottom: '8px',
                    },
                  },
                },
                // Subtitle
                {
                  type: 'div',
                  props: {
                    style: {
                      fontFamily: '"Liberation Sans"',
                      fontSize: '21px',
                      fontWeight: 400,
                      lineHeight: 1.7,
                      color: '#363a45',
                      maxWidth: '800px',
                    },
                    children: page.subtitle,
                  },
                },
              ],
            },
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '40px',
                left: '80px',
                fontFamily: '"Liberation Sans"',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: '#7d8291',
              },
              children: page.footer,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'DejaVu Serif', data: serifData.buffer, style: 'normal', weight: 700 },
        { name: 'Liberation Sans', data: sansData.buffer, style: 'normal', weight: 400 },
      ],
    }
  )

  const buffer = Buffer.from(await response.arrayBuffer())
  await writeFile(page.output, buffer)
  console.log(`Generated: ${page.output}`)
}

console.log('Done — all OG images generated.')
