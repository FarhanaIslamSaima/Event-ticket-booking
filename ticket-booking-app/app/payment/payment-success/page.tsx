"use client"
import dynamic from "next/dynamic"

// Import the client-only component dynamically
const PaymentSuccess = dynamic(() => import("./PaymentSuccessClient"), {
  ssr: false, // 👈 disables server-side rendering
})

export default function Page() {
  return <PaymentSuccess />
}
