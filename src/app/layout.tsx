import React from 'react'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <div id='alert-root' />
        {children}
      </body>
    </html>
  )
}
