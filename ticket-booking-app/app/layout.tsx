import type { Metadata } from 'next'
import './globals.css'
import { ToastContainer, toast } from 'react-toastify';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Providers from '@/lib/Providers/Provider';
export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ToastContainer/>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
