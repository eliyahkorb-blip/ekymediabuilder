'use client'
import Script from 'next/script'

export default function BuilderPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
          height: 100%;
          overflow: hidden;
          background: #0a0a0b;
          color: #f4f4f2;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: 13px;
          font-weight: 500;
          user-select: none;
        }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2c2c2e; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #3c3c3e; }
        button { cursor: pointer; font-family: inherit; }
        input, textarea, select { font-family: inherit; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        #root { height: 100vh; animation: fadeUp 0.3s ease; }
      `}</style>
      <div
        id="root"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#55555a',
          fontSize: 13,
          letterSpacing: '0.04em',
        }}
      >
        EKY Builder lädt…
      </div>
      <Script src="/builder/app.bundle.js" strategy="afterInteractive" />
    </>
  )
}
