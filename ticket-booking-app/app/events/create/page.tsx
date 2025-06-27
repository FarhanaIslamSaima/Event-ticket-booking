"use client";
import React from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventValidationSchema, defaultEventValues } from '@/validation/eventValidation';
import ReUseForm from '@/components/Form/ReForm';
import ReUseInput from '@/components/Form/ReInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Users, DollarSign, Image, FileText, Settings, User } from 'lucide-react';

const EventCreate = () => {
    const handleEventSubmit = (data: any) => {
        console.log("Event Data Submitted:", data);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                        <CalendarDays className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Event</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Fill in the details below to create your event. All fields marked with an asterisk (*) are required.
                    </p>
                </div>

                {/* Main Form Card */}
                <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <Settings className="w-6 h-6 text-blue-600" />
                            Event Details
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Configure your event settings and information
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                        <ReUseForm 
                            defaultValues={defaultEventValues} 
                            onSubmit={handleEventSubmit} 
                            resolver={zodResolver(eventValidationSchema)}
                        >
                            {/* Basic Information Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <ReUseInput name="title" label="Event Title" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <ReUseInput name="description" label="Event Description" />
                                    </div>
                                    <ReUseInput name="category" label="Event Category" />
                                    <ReUseInput name="status" label="Status" />
                                </div>
                            </div>

                            {/* Event Details Section */}
                            <div className="space-y-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Location & Organization</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ReUseInput name="venue" label="Event Venue" />
                                    <ReUseInput name="organizer" label="Event Organizer" />
                                </div>
                            </div>

                            {/* Date & Time Section */}
                            <div className="space-y-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <CalendarDays className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Schedule</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <ReUseInput name="event_date" label="Event Date" />
                                    <ReUseInput name="end_date" label="End Date" />
                                </div>
                            </div>

                            {/* Ticketing Section */}
                            <div className="space-y-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Ticketing & Pricing</h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ReUseInput name="total_tickets" label="Total Tickets" />
                                    <ReUseInput name="available_tickets" label="Available Tickets" />
                                    <ReUseInput name="base_price" label="Base Price" />
                                </div>
                            </div>

                            {/* Media & Legal Section */}
                            <div className="space-y-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                                        <Image className="w-4 h-4 text-pink-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Media & Legal</h3>
                                </div>
                                
                                <div className="space-y-6">
                                    <ReUseInput name="image_url" label="Event Image URL" />
                                    <ReUseInput name="terms_conditions" label="Terms and Conditions" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                    <button
                                        type="button"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:ring-4 focus:ring-gray-200"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                                    >
                                        Create Event
                                    </button>
                                </div>
                            </div>
                        </ReUseForm>
                    </CardContent>
                </Card>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Need help? Check our <span className="text-blue-600 hover:text-blue-800 cursor-pointer">documentation</span> or 
                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer"> contact support</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventCreate;