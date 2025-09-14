"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Copy, ArrowRight, CreditCard, AlertCircle } from "lucide-react"

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams()
  // const [tranId, setTranId] = useState<string | null>(null)
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const tranId = searchParams.get("tran_id")


  const copyToClipboard = () => {
    if (tranId) {
      navigator.clipboard.writeText(tranId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
  //       <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
  //         <div className="space-y-3">
  //           <div className="flex items-center justify-center gap-2 text-gray-600">
  //             {/* <Clock className="w-5 h-5" /> */}
  //             <span className="text-lg font-medium">Verifying payment...</span>
  //           </div>
  //           <p className="text-gray-500">Please wait while we confirm your transaction</p>
  //         </div>
  //         <div className="mt-8 flex justify-center space-x-2">
  //           <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
  //           <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
  //           <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!tranId) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
  //       <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
  //         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //           <AlertCircle className="w-8 h-8 text-red-600" />
  //         </div>
  //         <h1 className="text-2xl font-bold text-gray-800 mb-3">Invalid Transaction</h1>
  //         <p className="text-gray-600 mb-8">No transaction ID found in the URL. Please check your payment link.</p>
  //         <button 
  //           onClick={() => window.history.back()}
  //           className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
  //         >
  //           Go Back
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center transform animate-in duration-700 ease-out">
        {/* Success Icon with Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600 animate-in duration-1000 ease-out" />
          </div>
          <div className="absolute inset-0 w-24 h-24 bg-green-200 rounded-full mx-auto animate-ping opacity-20"></div>
        </div>

        {/* Success Message */}
        <div className="space-y-4 mb-10">
          <h1 className="text-3xl font-bold text-gray-800 animate-in duration-500 ease-out">
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-600 text-lg">
            Your transaction has been {verified ? 'verified and ' : ''}completed successfully
          </p>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Transaction ID</span>
          </div>
          
          <div className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-200">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-lg font-bold text-gray-800 break-all">
                {tranId}
              </span>
              <button
                onClick={copyToClipboard}
                className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                title="Copy transaction ID"
              >
                <Copy className={`w-5 h-5 transition-colors duration-200 ${
                  copied ? 'text-green-600' : 'text-gray-500 group-hover:text-gray-700'
                }`} />
              </button>
            </div>
            {copied && (
              <div className="mt-2 text-sm text-green-600 font-medium animate-in duration-200">
                ✓ Copied to clipboard
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {verified && (
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <CheckCircle className="w-4 h-4" />
            Verified & Confirmed
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => window.location.href = '/my-tickets'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
          >
            Go to My Ticket
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <button 
            onClick={() => window.print()}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-medium transition-all duration-200"
          >
            Print Receipt
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your registered email address
          </p>
        </div>
      </div>
    </div>
  )
}