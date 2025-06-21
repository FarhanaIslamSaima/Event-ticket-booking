"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { Search } from "lucide-react"

import EventCard from "@/components/event-card"
import FeaturedEvent from "@/components/featured-event"
import Header from "@/components/header" // Correct case: lowercase 'h'
import Footer from "@/components/footer"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredEvent = {
    id: "1",
    title: "Taylor Swift | The Eras Tour",
    date: "Sat, Jun 15, 2024 • 7:00 PM",
    location: "SoFi Stadium, Los Angeles",
    imageUrl: "/placeholder.svg?height=400&width=800",
    price: "From $99",
  }

  const events = [
    {
      id: "2",
      title: "NBA Finals 2024",
      date: "Thu, Jun 20, 2024 • 6:30 PM",
      location: "Madison Square Garden, New York",
      imageUrl: "/placeholder.svg?height=200&width=300",
      price: "From $120",
      category: "sports",
    },
    {
      id: "3",
      title: "Coldplay World Tour",
      date: "Fri, Jul 5, 2024 • 8:00 PM",
      location: "Wembley Stadium, London",
      imageUrl: "/placeholder.svg?height=200&width=300",
      price: "From $85",
      category: "concerts",
    },
    {
      id: "4",
      title: "Hamilton - Broadway Musical",
      date: "Multiple Dates",
      location: "Richard Rodgers Theatre, New York",
      imageUrl: "/placeholder.svg?height=200&width=300",
      price: "From $199",
      category: "theater",
    },
    {
      id: "5",
      title: "Comic Con 2024",
      date: "Jul 25-28, 2024",
      location: "San Diego Convention Center",
      imageUrl: "/placeholder.svg?height=200&width=300",
      price: "From $65",
      category: "conventions",
    },
    {
      id: "6",
      title: "UFC 300",
      date: "Sat, Aug 10, 2024 • 7:00 PM",
      location: "T-Mobile Arena, Las Vegas",
      imageUrl: "/placeholder.svg?height=200&width=300",
      price: "From $225",
      category: "sports",
    },
    {
      id: "7",
      title: "Adele Residency",
      date: "Multiple Dates",
      location: "Caesars Palace, Las Vegas",
      imageUrl: "/placeholder.svg?height=200&width=300",
      price: "From $250",
      category: "concerts",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
    

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Find and book tickets for your favorite events
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:mt-5">
                Concerts, sports, theater, and more - all in one place
              </p>

              <div className="mt-8 max-w-xl mx-auto">
                <div className="flex items-center bg-white rounded-lg overflow-hidden p-1">
                  <div className="pl-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search events, venues, or artists"
                    className="w-full p-3 focus:outline-none text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Event */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Event</h2>
            <FeaturedEvent event={featuredEvent} />
          </div>
        </section>

        {/* Event Categories */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Browse Events</h2>

            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-8">
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${
                    selected
                      ? "bg-white shadow text-purple-700"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  }`
                  }
                >
                  All Events
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${
                    selected
                      ? "bg-white shadow text-purple-700"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  }`
                  }
                >
                  Concerts
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${
                    selected
                      ? "bg-white shadow text-purple-700"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  }`
                  }
                >
                  Sports
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${
                    selected
                      ? "bg-white shadow text-purple-700"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  }`
                  }
                >
                  Theater
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                  ${
                    selected
                      ? "bg-white shadow text-purple-700"
                      : "text-gray-700 hover:bg-white/[0.12] hover:text-purple-600"
                  }`
                  }
                >
                  More
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events
                      .filter((event) => event.category === "concerts")
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events
                      .filter((event) => event.category === "sports")
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events
                      .filter((event) => event.category === "theater")
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events
                      .filter((event) => !["concerts", "sports", "theater"].includes(event.category))
                      .map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-purple-700 text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss Your Favorite Events</h2>
            <p className="text-xl mb-8">Sign up for alerts and be the first to know when tickets go on sale</p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-3 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-indigo-800 hover:bg-indigo-900 px-6 py-3 rounded-r-md font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

   
    </div>
  )
}
