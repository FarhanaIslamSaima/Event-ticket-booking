// app/ClientWrapper.tsx (Client Component)
"use client"

import Providers from '@/lib/Providers/Provider'
import { ToastContainer } from 'react-toastify'
import Header from '@/components/header'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <ToastContainer />
      <Header />
      {children}
    </Providers>
  )
}
