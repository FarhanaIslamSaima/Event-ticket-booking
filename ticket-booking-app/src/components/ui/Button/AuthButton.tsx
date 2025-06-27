'use client';
import React from 'react';
import { useState,useEffect } from 'react';
import { removeAccessToken,getUserProfile } from '@/service/actions/authService';
import { useRouter } from 'next/navigation';
import { DecodedData } from '@/type/common';
import {  User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTokenFromLocal } from '@/utils/FormData/localStorage';
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu"
import { userInfo } from 'os';
import { get } from 'http';

const AuthButton = () => {
    const[user,setUser] = useState<DecodedData>();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const handleLogout = () => {
        removeAccessToken();
        router.refresh()
        setUser(undefined);
        router.push('login');

    };
    useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true)
        console.log(getTokenFromLocal('accessToken'))
       
        if(getTokenFromLocal('accessToken')!='') {
        const userInfo = await getUserProfile()

        console.log("User Info:", userInfo)
        setUser(userInfo)
        }

      } catch (error) {
        console.error("Failed to fetch user info:", error)
        setUser(undefined)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, []) // Remove 'user' from dependency array

  // Show loading state
  if (loading) {
    return (
      <Button variant="outline" disabled className="bg-white text-gray-700 border-gray-300">
        Loading...
      </Button>
    )
  }

    if (!user && !loading) {
    return (
      <Button onClick={() => router.push('/login')} variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
        Login
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-gray-50 border-gray-200 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <User className="h-5 w-5 text-gray-600" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer hover:bg-gray-50">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer hover:bg-gray-50 text-red-600 focus:text-red-600"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
       <span className="text-sm text-gray-700 font-medium">Welcome, {user && user.username}!</span>
    </div>
  )
};

export default AuthButton;
