export const metadata = {
  title: 'EKY Builder',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, padding: 0, background: '#0a0a0b' }}>
        {children}
      </body>
    </html>
  )
}
