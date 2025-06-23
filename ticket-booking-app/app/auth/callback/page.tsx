'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { saveAccessToken } from '@/service/actions/authService'
import { getTokenFromLocal } from '@/utils/FormData/localStorage'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const userId = searchParams.get('user_id')
    const email = searchParams.get('email')

    if (token) {
      // Store the token (localStorage, cookies, or your preferred method)
       console.log('Token received:', token)
       
       saveAccessToken({accessToken:token})
        const storedToken = getTokenFromLocal('accessToken')
          if (storedToken && storedToken.trim() !== '') {
            router.push('/')
          } else {
            router.push('/login')
          }// Redirect to dashboard or home page
                
     
    
      // Redirect to dashboard or home page
     
    } else {
      // Handle error case
      router.push('/login?error=auth_failed')
    }
  }, [searchParams, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing sign in...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  )
}