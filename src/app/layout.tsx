import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DocYa Referidos — Ganá Compartiendo Salud',
  description: 'Sumate al programa de referidos de DocYa. Ganá $1.000 por cada consulta realizada por tus referidos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
