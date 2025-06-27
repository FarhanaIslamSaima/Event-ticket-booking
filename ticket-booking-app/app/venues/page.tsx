"use client"
import { useGetAllVenueQuery } from "@/redux/api/venueApi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  MapPin,
  Users,
  Phone,
  Mail,
  Calendar,
  Building2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useEffect } from "react"

interface Venue {
  id: string | number
  name: string
  address: string
  city: string
  state: string
  country: string
  capacity: number
  contact_phone: string
  contact_email: string
  is_active: boolean
  created_at: string
  updated_at: string
}

const VenueCard = ({ venue }: { venue: Venue }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 line-clamp-2">{venue.name}</CardTitle>
          <Badge
            variant={venue.is_active ? "default" : "secondary"}
            className={venue.is_active ? "bg-green-100 text-green-800" : ""}
          >
            {venue.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Location */}
        <div className="flex items-start space-x-3">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p>{venue.address}</p>
            <p>
              {venue.city}, {venue.state}
            </p>
            <p>{venue.country}</p>
          </div>
        </div>

        {/* Capacity */}
        <div className="flex items-center space-x-3">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            Capacity: <span className="font-medium text-gray-900">{venue.capacity.toLocaleString()}</span>
          </span>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Phone className="h-4 w-4 text-gray-500" />
            <a
              href={`tel:${venue.contact_phone}`}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {venue.contact_phone}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-gray-500" />
            <a
              href={`mailto:${venue.contact_email}`}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors truncate"
            >
              {venue.contact_email}
            </a>
          </div>
        </div>

        {/* Created Date */}
        <div className="flex items-center space-x-3 pt-2 border-t border-gray-100">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-500">Added {formatDate(venue.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

const VenueCardSkeleton = () => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-16" />
      </div>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <Skeleton className="h-4 w-1/3" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <Skeleton className="h-3 w-1/2" />
    </CardContent>
  </Card>
)

const Page = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get pagination parameters from URL
  const currentPage = Number.parseInt(searchParams.get("page") || "1", 10)
  const pageSize = Number.parseInt(searchParams.get("limit") || "12", 10)

  const query: Record<string, any> = {
    page: currentPage,
    limit: pageSize,
  }

  const { data, isLoading, isError, error, refetch, isFetching } = useGetAllVenueQuery(query, {
    refetchOnMountOrArgChange: true,
  })

  const venues: Venue[] = data?.venues || []
  const totalVenues = data?.total || 0
  const totalPages = Math.ceil(totalVenues / pageSize)

  // Function to update URL parameters
  const updateURL = useCallback(
    (page: number, limit: number) => {
      const params = new URLSearchParams(searchParams.toString())

      if (page === 1) {
        params.delete("page")
      } else {
        params.set("page", page.toString())
      }

      if (limit === 12) {
        params.delete("limit")
      } else {
        params.set("limit", limit.toString())
      }

      const queryString = params.toString()
      const newURL = queryString ? `${pathname}?${queryString}` : pathname

      router.push(newURL, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const handlePageChange = (page: number) => {
    updateURL(page, pageSize)
  }

  const handlePageSizeChange = (newPageSize: number) => {
    updateURL(1, newPageSize) // Reset to first page when changing page size
  }

  // Validate current page and redirect if invalid
  useEffect(() => {
    if (!isLoading && totalPages > 0 && currentPage > totalPages) {
      updateURL(1, pageSize)
    }
  }, [currentPage, totalPages, isLoading, updateURL, pageSize])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Venues</h1>
                <p className="text-gray-600 mt-1">
                  {!isLoading && !isError && (
                    <>
                      {totalVenues} venue{totalVenues !== 1 ? "s" : ""} found
                      {totalPages > 1 && (
                        <span className="text-gray-500">
                          {" • "}Page {currentPage} of {totalPages}
                        </span>
                      )}
                    </>
                  )}
                </p>
              </div>
            </div>

            <Button onClick={() => refetch()} disabled={isFetching} variant="outline" size="sm">
              <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {(isLoading || isFetching) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: Math.min(pageSize, 6) }).map((_, index) => (
              <VenueCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <div className="flex items-center justify-between">
                <span>Error loading venues. Please try again.</span>
                <Button onClick={() => refetch()} variant="outline" size="sm" className="ml-4">
                  Retry
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !isError && venues.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No venues found</h3>
            <p className="text-gray-600 mb-4">There are no venues available at the moment.</p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        )}

        {/* Venues Grid */}
        {!isLoading && !isError && venues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={6}>6 per page</option>
                <option value={12}>12 per page</option>
                <option value={24}>24 per page</option>
                <option value={48}>48 per page</option>
              </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* Previous Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || isFetching}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <Button
                      variant={1 === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      disabled={isFetching}
                      className="w-10"
                    >
                      1
                    </Button>
                    {currentPage > 4 && <span className="text-gray-500">...</span>}
                  </>
                )}

                {/* Current page and surrounding pages */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                  if (pageNum > totalPages) return null

                  return (
                    <Button
                      key={pageNum}
                      variant={pageNum === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isFetching}
                      className="w-10"
                    >
                      {pageNum}
                    </Button>
                  )
                })}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="text-gray-500">...</span>}
                    <Button
                      variant={totalPages === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={isFetching}
                      className="w-10"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || isFetching}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Results Info */}
            <div className="text-sm text-gray-700">
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalVenues)} to{" "}
              {Math.min(currentPage * pageSize, totalVenues)} of {totalVenues} results
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
