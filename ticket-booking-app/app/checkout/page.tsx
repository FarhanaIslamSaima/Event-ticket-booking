"use client"
import React from "react"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useGetOrdersQuery } from "@/redux/api/orderApi"
import ReUseForm from "@/components/Form/ReForm"
import ReUseInput from "@/components/Form/ReInput"
import { paymentValidationSchema } from "@/validation/paymentValidation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useInitiatePaymentMutation } from "@/redux/api/paymentApi"

export default function Checkout() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const query = { id: orderId ? parseInt(orderId) : undefined }
  const { data: orders, isLoading } = useGetOrdersQuery(query)

  const defaultPaymentValues = {
    event_id: orders?.event?.id,
    amount: orders?.total_amount || 0,
    name: orders?.user?.username || "",
    email: orders?.user?.email || "",
  }
  const [initiatePayment] = useInitiatePaymentMutation()

  const handleSubmitForm = async (data: any) => {
    console.log("Payment submitted:", data)
    const res = await initiatePayment(data).unwrap()
    console.log("Response from initiatePayment:", res)

    if (res?.gateway_url) {
      window.location.href = res.gateway_url
    } else {
      alert("Failed to initiate payment. Please try again.")
    }

   
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/events/1"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Event
          </Link>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <ReUseForm
            onSubmit={handleSubmitForm}
            defaultValues={defaultPaymentValues}
            resolver={zodResolver(paymentValidationSchema)}
          >
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ReUseInput name="name" label="Full Name" type="text" />
                    <ReUseInput name="email" label="Email Address" type="email" />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8 space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium">{orders?.event?.title || "Event Name"}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {orders?.event?.venue?.name || "Venue Name"},{" "}
                      {orders?.event?.venue?.address || "Address"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Tickets ({orders?.number_of_tickets || 1})
                      </span>
                      <span>${orders?.total_amount || 0}</span>
                    </div>
                  
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                  
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Complete Purchase
                  </button>

                  <p className="mt-4 text-xs text-gray-500 text-center">
                    By completing this purchase you agree to our{" "}
                    <Link href="#" className="text-purple-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-purple-600 hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </ReUseForm>
        </div>
      </main>
    </div>
  )
}
