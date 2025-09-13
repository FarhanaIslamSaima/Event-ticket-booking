"use client";

import type React from "react";
import { useState } from "react";
import ReUseForm from "@/components/Form/ReForm";
import ReUseSelect from "@/components/Form/ReSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  Clock,
  MapPin,
  Share,
  Heart,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { useGetEventsQuery } from "@/redux/api/eventApi";
import { useSearchParams } from "next/navigation";
import { defaultOrderValues } from "@/validation/orderValidation";
import { orderValidationSchema } from "@/validation/orderValidation";
import { useCreateOrderMutation } from "@/redux/api/orderApi";

export default function EventDetails() {
  const [createOrder] = useCreateOrderMutation();
const [quantity, setQuantity] =useState(1);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formattedTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const query = { id: eventId };
  const { data: eventData } = useGetEventsQuery(query);

  const handleOrderSubmit = async (data: any) => {
    console.log("Order Form submitted with data:", data);

    try {
      const res = await createOrder(data).unwrap();
      console.log("Response from createOrder:", res);
      if (res?.id) {
        alert("Order created successfully!");
        window.location.href = `/checkout?id=${res.id}`;
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  // Add loading state
  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading event details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1">
        {/* Banner Section */}
        <div className="relative h-80 md:h-96 lg:h-[500px]">
          <Image
            src={eventData?.image_url || "/placeholder.svg"}
            alt={eventData?.title || "Event"}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {eventData?.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-white">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  <span>{formatDate(eventData?.event_date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{formattedTime(eventData?.event_date)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{eventData?.venue?.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Event Details</h2>
                  <div className="flex space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                      <Share className="h-5 w-5 mr-1" />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                      <Heart className="h-5 w-5 mr-1" />
                      <span className="text-sm">Save</span>
                    </button>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <p>{eventData?.description}</p>
                </div>

                {/* Venue Info */}
                <div className="mb-8">
                  <Disclosure>
                    {({ open }) => (
                      <div>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-50 px-4 py-3 text-left text-sm font-medium text-purple-900 hover:bg-purple-100">
                          <span>Venue Information</span>
                          {open ? (
                            <ChevronUp className="h-5 w-5 text-purple-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-purple-500" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                          <p className="mb-2">
                            <strong>{eventData?.venue?.name}</strong>
                          </p>
                          <p className="mb-2">{eventData?.venue?.address}</p>
                          <p className="mb-2">
                            Capacity: {eventData?.venue?.capacity}
                          </p> 
                         <p className="mb-2">
                            Contact: {eventData?.venue?.contact_email},{" "}
                            {eventData?.venue?.contact_phone}
                          </p>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>

                  {/* Event Policies */}
                  <Disclosure as="div" className="mt-4">
                    {({ open }) => (
                      <div>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-50 px-4 py-3 text-left text-sm font-medium text-purple-900 hover:bg-purple-100">
                          <span>Event Policies</span>
                          {open ? (
                            <ChevronUp className="h-5 w-5 text-purple-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-purple-500" />
                          )}
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                          <ul className="list-disc pl-5 space-y-2">
                            <li>All sales are final. No refunds or exchanges.</li>
                            <li>
                              Tickets cannot be replaced if lost, stolen, or
                              damaged.
                            </li>
                            <li>Event date and time subject to change.</li>
                            <li>
                              No professional cameras or recording devices
                              allowed.
                            </li>
                            <li>No outside food or beverages.</li>
                          </ul>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>

            {/* Right Column - Ticket Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-lg p-6 lg:sticky lg:top-8">
                <h3 className="text-xl font-bold mb-6">Select Tickets</h3>

                <ReUseForm
                  defaultValues={{
                    ...defaultOrderValues,
                    event_id: eventId ? parseInt(eventId) : 1,
                    number_of_tickets: quantity,
                  }}
                  onSubmit={handleOrderSubmit}
                  resolver={zodResolver(orderValidationSchema)}
                >
                  <div className="space-y-4 mb-6">
                    <div>
                      <ReUseSelect
                        name="number_of_tickets"
                        label="Number of Tickets"
                        options={Array.from(
                          { length: Math.min(eventData?.total_tickets || 8, 8) },
                          (_, i) => ({
                            name: String(i + 1),
                            id: i + 1,
                          })
                        )}
                        onChange={(value: string | number) => setQuantity(Number(value))}
                      />
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Price per ticket</span>
                      <span>${eventData?.base_price || 0}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Quantity</span>
                      <span>{quantity}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${((eventData?.base_price || 0) * quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Service Fee</span>
                      <span>${((eventData?.base_price || 0) * quantity * 0.15).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${((eventData?.base_price || 0) * quantity * 1.15).toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                </ReUseForm>

                <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                  <Info className="h-4 w-4 mr-1" />
                  <span>Tickets will be emailed to you</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}