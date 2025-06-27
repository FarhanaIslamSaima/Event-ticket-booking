"use client";
import React from 'react';
import { venueValidationSchema, defaultVenueValues } from '@/validation/venueValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ReUseForm from '@/components/Form/ReForm';
import ReUseInput from '@/components/Form/ReInput';
import { useCreateVenueMutation} from '@/redux/api/venueApi';
import {toast} from 'react-toastify'


const page = () => {
    const [createVenue] = useCreateVenueMutation();
    const handleSubmit = async(data: any) => {
        console.log("Form submitted with data:", data);

        const res= await createVenue(data).unwrap();
        console.log("Response from createVenue:", res)
        if (res?.id) {
            toast.success("Venue created successfully!");
            // Redirect to the newly created venue page
        } else {
            toast.error("Failed to create venue. Please try again.");
        }
       
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-blue-600 text-white shadow-lg">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                        Add New Venue
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Create a comprehensive venue profile with all the essential details for your event management system.
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border-0 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Venue Information
                        </h2>
                        <p className="text-blue-100 mt-1">
                            Please fill in all the required information about the venue
                        </p>
                    </div>
                    
                    <div className="p-8">
                        <ReUseForm onSubmit={handleSubmit} defaultValues={defaultVenueValues} resolver={zodResolver(venueValidationSchema)}>
                            {/* Basic Information Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 text-sm border border-blue-200 text-blue-600 rounded-full">
                                        Basic Information
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ReUseInput name="name" label='name' type='text' />
                                    <ReUseInput name="capacity" label='capacity' type='number'   />
                                </div>
                            </div>

                            {/* Location Section */}
                            <div className="space-y-6 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 text-sm border border-green-200 text-green-600 rounded-full">
                                        Location Details
                                    </span>
                                </div>
                                
                                <ReUseInput name="address" label='address' type='text' />
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ReUseInput name="city" label='city' type='text' />
                                    <ReUseInput name="state" label='state' type='text' />
                                    <ReUseInput name="country" label='country' type='text' />
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="space-y-6 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 text-sm border border-purple-200 text-purple-600 rounded-full">
                                        Contact Information
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ReUseInput name="contact_phone" label='contact_phone' type='tel' />
                                    <ReUseInput name="contact_email" label='contact_email' type='email' />
                                </div>
                            </div>

                            {/* Status Section */}
                            <div className="space-y-6 pt-8 border-t border-slate-200">
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="px-3 py-1 text-sm border border-orange-200 text-orange-600 rounded-full">
                                        Status
                                    </span>
                                </div>
                                
                                <ReUseInput name="is_active" label='is_active' type='checkbox' />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8 border-t border-slate-200">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 min-w-[200px]"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Submit
                                </button>
                            </div>
                        </ReUseForm>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-500 text-sm">
                    <p>All fields are required unless otherwise specified</p>
                </div>
            </div>
        </div>
    );
};

export default page;