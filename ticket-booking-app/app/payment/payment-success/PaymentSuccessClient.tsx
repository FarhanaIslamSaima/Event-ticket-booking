"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams()
  const [tranId, setTranId] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = searchParams.get("tran_id")
    if (!id) {
      setLoading(false)
      return
    }

    setTranId(id)

    // 🔹 Call your Django backend to verify payment
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/success/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tran_id: id }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Payment verified:", data)
        setVerified(true)
      })
      .catch(err => console.error("Payment verify failed:", err))
      .finally(() => setLoading(false))
  }, [searchParams])

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-xl">Loading payment status...</h1>
      </div>
    )
  }

  if (!tranId) {
    return (
      <div className="p-6">
        <h1 className="text-xl text-red-600">Invalid transaction!</h1>
        <p>No transaction ID found in URL.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Payment Successful! 🎉</h1>
      <p>Your transaction ID: <strong>{tranId}</strong></p>
      {verified ? (
        <p className="text-green-600">✅ Payment verified successfully!</p>
      ) : (
        <p className="text-yellow-600">⚠️ Could not verify payment.</p>
      )}
    </div>
  )
}
