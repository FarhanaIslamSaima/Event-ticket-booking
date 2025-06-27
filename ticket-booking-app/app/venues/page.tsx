"use client"
import { useGetAllVenueQuery } from "@/redux/api/venueApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import VenueCardSkeleton from "@/components/ui/Card/VenueCardSkeleton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Filter, X, CheckCircle } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import VenueCard from "@/components/ui/Card/venueCard"
import type { Venue } from "@/types/venue" // Import Venue type

const Page = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get all parameters from URL
  const currentPage = Number.parseInt(searchParams.get("page") || "1", 10)
  const pageSize = Number.parseInt(searchParams.get("limit") || "12", 10)
  const activeStatus = searchParams.get("is_active") || "all"
  const capacityRange = searchParams.get("capacity") || "all"
  const minCapacity = searchParams.get("min_capacity") || ""
  const maxCapacity = searchParams.get("max_capacity") || ""

  // Local state for capacity inputs (for debouncing)
  const [minCapacityInput, setMinCapacityInput] = useState(minCapacity)
  const [maxCapacityInput, setMaxCapacityInput] = useState(maxCapacity)

  const query: Record<string, any> = {
    page: currentPage,
    limit: pageSize,
  }

  // Add search and filter parameters to query
  if (activeStatus !== "all") query.is_active = activeStatus
  if (capacityRange !== "all") query.capacity_range = capacityRange
  if (minCapacity) query.min_capacity = minCapacity
  if (maxCapacity) query.max_capacity = maxCapacity

  const { data, isLoading, isError, error, refetch, isFetching } = useGetAllVenueQuery(query, {
    refetchOnMountOrArgChange: true,
  })

  const venues: Venue[] = data?.venues || []
  const totalVenues = data?.total || 0
  const totalPages = Math.ceil(totalVenues / pageSize)

  // Function to update URL parameters
  const updateURL = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === "" ||
          value === "all" ||
          (key === "page" && value === 1) ||
          (key === "limit" && value === 12)
        ) {
          params.delete(key)
        } else {
          params.set(key, value.toString())
        }
      })

      const queryString = params.toString()
      const newURL = queryString ? `${pathname}?${queryString}` : pathname

      router.push(newURL, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const handlePageChange = (page: number) => {
    updateURL({ page })
  }

  const handlePageSizeChange = (newPageSize: number) => {
    updateURL({ page: 1, limit: newPageSize })
  }

  const handleActiveStatusChange = (status: string) => {
    updateURL({ is_active: status === "all" ? null : status, page: 1 })
  }

  const handleCapacityRangeChange = (range: string) => {
    updateURL({
      capacity: range === "all" ? null : range,
      min_capacity: null,
      max_capacity: null,
      page: 1,
    })
  }

  const handleCustomCapacityChange = (min: string, max: string) => {
    updateURL({
      min_capacity: min || null,
      max_capacity: max || null,
      capacity: null,
      page: 1,
    })
  }

  const clearAllFilters = () => {
    setMinCapacityInput("")
    setMaxCapacityInput("")
    updateURL({
      is_active: null,
      capacity: null,
      min_capacity: null,
      max_capacity: null,
      page: 1,
    })
  }

  // Debounced capacity filter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (minCapacityInput !== minCapacity || maxCapacityInput !== maxCapacity) {
        handleCustomCapacityChange(minCapacityInput, maxCapacityInput)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [minCapacityInput, maxCapacityInput, minCapacity, maxCapacity])

  // Validate current page and redirect if invalid
  useEffect(() => {
    if (!isLoading && totalPages > 0 && currentPage > totalPages) {
      updateURL({ page: 1 })
    }
  }, [currentPage, totalPages, isLoading, updateURL])

  // Count active filters
  const activeFiltersCount = [
    activeStatus !== "all" ? activeStatus : null,
    capacityRange !== "all" ? capacityRange : null,
    minCapacity,
    maxCapacity,
  ].filter(Boolean).length

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
                      {activeFiltersCount > 0 && (
                        <span className="text-blue-600">
                          {" • "}
                          {activeFiltersCount} filter
                          {activeFiltersCount !== 1 ? "s" : ""} active
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

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
            {activeFiltersCount > 0 && (
              <Button onClick={clearAllFilters} variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Status Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <div className="relative">
                <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Select value={activeStatus} onValueChange={handleActiveStatusChange}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All venues</SelectItem>
                    <SelectItem value="true">Active only</SelectItem>
                    <SelectItem value="false">Inactive only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Capacity Range Presets */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Capacity Range</Label>
              <Select value={capacityRange} onValueChange={handleCapacityRangeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select capacity range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All capacities</SelectItem>
                  <SelectItem value="small">Small (1-100)</SelectItem>
                  <SelectItem value="medium">Medium (101-500)</SelectItem>
                  <SelectItem value="large">Large (501-1000)</SelectItem>
                  <SelectItem value="xlarge">Extra Large (1000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Custom Min Capacity */}
            <div className="space-y-2">
              <Label htmlFor="min-capacity" className="text-sm font-medium">
                Min Capacity
              </Label>
              <Input
                id="min-capacity"
                type="number"
                placeholder="e.g. 50"
                value={minCapacityInput}
                onChange={(e) => setMinCapacityInput(e.target.value)}
                min="0"
              />
            </div>

            {/* Custom Max Capacity */}
            <div className="space-y-2">
              <Label htmlFor="max-capacity" className="text-sm font-medium">
                Max Capacity
              </Label>
              <Input
                id="max-capacity"
                type="number"
                placeholder="e.g. 1000"
                value={maxCapacityInput}
                onChange={(e) => setMaxCapacityInput(e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeStatus !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {activeStatus === "true" ? "Active" : "Inactive"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleActiveStatusChange("all")} />
                </Badge>
              )}
              {capacityRange !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Capacity: {capacityRange}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCapacityRangeChange("all")} />
                </Badge>
              )}
              {(minCapacity || maxCapacity) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Capacity: {minCapacity || "0"} - {maxCapacity || "∞"}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleCustomCapacityChange("", "")} />
                </Badge>
              )}
            </div>
          )}
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeFiltersCount > 0 ? "No venues match your filters" : "No venues found"}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeFiltersCount > 0
                ? "Try adjusting your search criteria or clearing some filters."
                : "There are no venues available at the moment."}
            </p>
            <div className="flex justify-center gap-2">
              {activeFiltersCount > 0 && (
                <Button onClick={clearAllFilters} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
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
