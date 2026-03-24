'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body style={{ padding: '2rem', fontFamily: 'system-ui', background: '#fff' }}>
        <h2>Something went wrong (global)</h2>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#c00', fontSize: '14px' }}>
          {error.message}
        </pre>
        {error.stack && (
          <pre style={{ whiteSpace: 'pre-wrap', color: '#666', fontSize: '12px', marginTop: '1rem' }}>
            {error.stack}
          </pre>
        )}
        {error.digest && <p>Digest: {error.digest}</p>}
        <button onClick={reset} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Try again
        </button>
      </body>
    </html>
  )
}
