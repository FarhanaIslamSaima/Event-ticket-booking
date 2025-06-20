"use client"
import { useState } from "react"
import { z } from "zod"
import ReUseForm from "@/components/Form/ReForm"
import ReUseInput from "@/components/Form/ReInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUser } from "@/service/actions/createUser"
import { ToastContainer, toast } from 'react-toastify';

const loginValidationSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Please provide a valid email address"),
    password1: z.string().min(8, "Password must be at least 8 characters"),
    password2: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password1 === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  })

const defaultValues = {
  username: "",
  email: "",
  password1: "",
  password2: "",
}

const Register = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (data: any) => {
    setIsLoading(true)
    setError("") // Clear previous errors

    try {
      const response = await createUser(data)
      console.log(response)
      toast.success("Registration successful! Please log in.")
      // Handle success - maybe redirect or show success message
    } catch (error: any) {
      console.error("Error during registration:", error)

      // Handle different types of Django REST errors
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response

        if (status === 400) {
          // Validation errors from Django
          if (data.non_field_errors) {
            // General errors (like "passwords don't match")
            setError(data.non_field_errors[0])
          } else if (data.username) {
            setError(`Username: ${data.username[0]}`)
          } else if (data.email) {
            setError(`Email: ${data.email[0]}`)
          } else if (data.password1) {
            setError(`Password: ${data.password1[0]}`)
          } else if (data.password2) {
            setError(`Confirm Password: ${data.password2[0]}`)
          } else {
            // Generic validation error
            setError("Please check your input and try again.")
          }
        } else if (status === 409) {
          // Conflict - user already exists
          setError("User with this email or username already exists.")
        } else if (status === 500) {
          // Server error
          setError("Server error. Please try again later.")
        } else {
          // Other HTTP errors
          setError(data.detail || "Registration failed. Please try again.")
        }
      } else if (error.request) {
        // Network error
        setError("Network error. Please check your connection and try again.")
      } else {
        // Other errors
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)

    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>

        {error && (
          <div className="bg-red-500 m-2 rounded-[10px] mb-4">
            <p className="p-2 text-white text-center">{error}</p>
          </div>
        )}

        <ReUseForm
          onSubmit={handleRegister}
          resolver={zodResolver(loginValidationSchema)}
          defaultValues={defaultValues}
        >
          <div className="space-y-4">
            <ReUseInput name="username" label="Name" />
            <ReUseInput name="email" label="Email" />
            <ReUseInput name="password1" label="Password" type="password" />
            <ReUseInput name="password2" label="Confirm Password" type="password" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            {isLoading ? "REGISTERING..." : "REGISTER"}
          </button>
        </ReUseForm>
      </div>
    </div>
  )
}

export default Register
