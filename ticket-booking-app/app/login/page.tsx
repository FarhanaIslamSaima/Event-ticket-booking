"use client";
import React from 'react';
import { z } from "zod";
import ReUseForm from '@/components/Form/ReForm';
import ReUseInput from '@/components/Form/ReInput';
import { login } from '@/service/actions/login';
import { toast } from 'react-toastify';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { saveAccessToken } from '@/service/actions/authService';
const loginValidationSchema = z.object({
    email: z.string().email('Please Provide a Valid Email Address'),

    password: z.string().min(8, "Password Must 8 characters")
})
const defaultValues = {
    email: '',
    password: ''
}

const Login = () => {
    const router = useRouter();
    const handleLogin = async(data: any) => {
        try{
            const response = await login(data);
            if(response.key) {
                 saveAccessToken({ accessToken: response.key })
            }
           

            toast.success("Login successful!");
            router.push("/"); // Redirect to home page after successful login
        }
        catch (error: any) {
            console.error("Error during login:", error);
            // Handle error appropriately, e.g., show a toast notification
        }
    }
    return (
       <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Log In</h2>

    <ReUseForm
      onSubmit={handleLogin}
      resolver={zodResolver(loginValidationSchema)}
      defaultValues={defaultValues}
    >
      <div className="space-y-4">
        <ReUseInput name="email" label="Email" />
        <ReUseInput name="password" label="Password" type="password" />
      </div>

      <div className="flex justify-between text-sm text-blue-600 mt-3">
        <a href="#" className="hover:underline">Forgot your password?</a>
        <a href="#" className="hover:underline">Register</a>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        LOG IN
      </button>
    </ReUseForm>
  </div>
</div>

    );
};

export default Login;
