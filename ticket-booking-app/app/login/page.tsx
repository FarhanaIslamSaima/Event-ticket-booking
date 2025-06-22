"use client"
import { useState } from "react"
import { z } from "zod"
import ReUseForm from "@/components/Form/ReForm"
import ReUseInput from "@/components/Form/ReInput"
import { login } from "@/service/actions/login"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { saveAccessToken } from "@/service/actions/authService"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

const loginValidationSchema = z.object({
  email: z.string().email("Please Provide a Valid Email Address"),
  password: z.string().min(8, "Password Must 8 characters"),
})

const forgotPasswordSchema = z.object({
  email: z.string().email("Please Provide a Valid Email Address"),
})

const defaultValues = {
  email: "",
  password: "",
}

const Login = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleLogin = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await login(data)
      if (response.key) {
        saveAccessToken({ accessToken: response.key })
      }

      toast.success("Login successful!")
      router.push("/")
    } catch (error: any) {
      console.error("Error during login:", error)
      toast.error("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    try {
      // Redirect to your Django Google OAuth endpoint
 // frontend route to handle token
       const loginUrl = `http://localhost:8000/accounts/google/login/?process=login`;
       window.location.href = loginUrl;

    } catch (error) {
      console.error("Google login error:", error)
      toast.error("Google login failed. Please try again.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleForgotPassword = async (data: any) => {
    try {
      // Add your forgot password API call here
      // await forgotPassword(data.email);
      toast.success("Password reset link sent to your email!")
      setShowForgotPassword(false)
    } catch (error) {
      console.error("Forgot password error:", error)
      toast.error("Failed to send reset email. Please try again.")
    }
  }

  if (showForgotPassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
            <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
          </div>

          <ReUseForm
            onSubmit={handleForgotPassword}
            resolver={zodResolver(forgotPasswordSchema)}
            defaultValues={{ email: "" }}
          >
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <ReUseInput name="email" label="Email Address" className="pl-10" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200"
            >
              Send Reset Link
            </button>
          </ReUseForm>

          <button
            onClick={() => setShowForgotPassword(false)}
            className="mt-4 w-full text-gray-600 hover:text-gray-800 font-medium py-2 transition-colors duration-300"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full mb-6 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 hover:shadow-md focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          )}
          <span>{isGoogleLoading ? "Signing in..." : "Continue with Google"}</span>
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <ReUseForm onSubmit={handleLogin} resolver={zodResolver(loginValidationSchema)} defaultValues={defaultValues}>
          <div className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <ReUseInput name="email" label="Email Address" className="pl-10" />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <ReUseInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </ReUseForm>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors duration-200"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
