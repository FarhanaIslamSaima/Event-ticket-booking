'use client';

import { useEffect, useState } from 'react';
import { getUserProfile } from '@/service/actions/authService';
import { DecodedData } from '@/type/common';
import { User, Mail, UserCheck, Edit3, Settings, Shield } from 'lucide-react';

const UserProfilePage = () => {
  const [user, setUser] = useState<DecodedData >();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile(); // this gets token from localStorage
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
              <Edit3 className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
               
                  <User className="w-12 h-12 text-white" />
                
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.first_name}
                </h2>
                <p className="text-gray-600 text-lg">@{user.username}</p>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Username</p>
                      <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</p>
                      <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <UserCheck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">First Name</p>
                      <p className="text-lg font-semibold text-gray-900">{user.first_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Status</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-lg font-semibold text-gray-900">Active</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors">
                <Edit3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Edit Profile</h3>
                <p className="text-gray-600">Update your personal information</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gray-100 rounded-2xl group-hover:bg-gray-200 transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Account Settings</h3>
                <p className="text-gray-600">Manage your account preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
