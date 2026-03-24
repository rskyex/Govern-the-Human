'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h2>Something went wrong</h2>
      <pre style={{ whiteSpace: 'pre-wrap', color: '#c00' }}>
        {error.message}
      </pre>
      {error.digest && <p>Digest: {error.digest}</p>}
      <button onClick={reset} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Try again
      </button>
    </div>
  )
}
