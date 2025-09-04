"use client"

import type React from "react"

import { useState } from "react"
import { CalendarDays, Clock, MapPin, Share, Heart, Info, ChevronDown, ChevronUp } from "lucide-react"
import { Disclosure } from "@headlessui/react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SeatSelection from "@/components/seat-selection"
import { useGetEventsQuery } from "@/redux/api/eventApi"
import { useSearchParams } from "next/navigation";

export default function EventDetails() {
    const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
  const formattedTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // set to true for AM/PM format
    })
  }

 
 const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  console.log("Event ID from URL:", eventId);
  const query = {
    id: eventId
  }
  const { data: eventData } = useGetEventsQuery(query);
  console.log("Fetched Event Data:", eventData);


  const [selectedDate, setSelectedDate] = useState("June 15, 2024")
  const [selectedTime, setSelectedTime] = useState("7:00 PM")
  const [quantity, setQuantity] = useState(2)

  const event = {
    id: "1",
    title: "Taylor Swift | The Eras Tour",
    description:
      "Experience the music of Taylor Swift's journey through the musical eras of her career (past and present!)",
    dates: ["June 15, 2024", "June 16, 2024", "June 17, 2024"],
    times: ["7:00 PM", "8:00 PM"],
    location: "SoFi Stadium",
    address: "1001 Stadium Dr, Inglewood, CA 90301",
    imageUrl: "/placeholder.svg?height=500&width=1000",
    price: 99,
    maxQuantity: 8,
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number.parseInt(e.target.value))
  }

  return (
    <div className="min-h-screen flex flex-col">
     

      <main className="flex-1">
        <div className="relative h-80 md:h-96 lg:h-[500px]">
          <Image src={eventData?.image_url|| "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{eventData?.title}</h1>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
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
              <div className="mb-8">
  <Disclosure>
    {({ open }) => (
      <div>
        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-50 px-4 py-3 text-left text-sm font-medium text-purple-900 hover:bg-purple-100 focus:outline-none">
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
          <p className="mb-2">Capacity: {eventData?.venue?.capacity}</p>
          <p className="mb-2">Contact: {eventData?.venue?.contact_email}, {eventData?.venue?.contact_phone}</p>
       


        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>

  <Disclosure as="div" className="mt-4">
    {({ open }) => (
      <div>
        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-50 px-4 py-3 text-left text-sm font-medium text-purple-900 hover:bg-purple-100 focus:outline-none">
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
            <li>Tickets cannot be replaced if lost, stolen, or damaged.</li>
            <li>Event date and time subject to change.</li>
            <li>No professional cameras or recording devices allowed.</li>
            <li>No outside food or beverages.</li>
          </ul>
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
</div>


            </div>

            <div className="mt-10 lg:mt-0">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold mb-6">Select Tickets</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      {event.dates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      {event.times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <select
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      value={quantity}
                      onChange={handleQuantityChange}
                    >
                      {Array.from({ length: event.maxQuantity }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price per ticket</span>
                    <span>${event.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Quantity</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${(event.price * quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service Fee</span>
                    <span>${(event.price * quantity * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>${(event.price * quantity * 1.15).toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                  Proceed to Checkout
                </button>

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
  )
}
