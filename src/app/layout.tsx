import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Assignment Submission Portal',
  description: 'Assignment Submission Portal'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-[#01052a] to-[#004e91]">
        {children}
      </body>
    </html>
  )
}
