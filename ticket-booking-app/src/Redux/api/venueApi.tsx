
import { tagTypes } from "../tag-type"

import { baseApi } from "./baseApi"

const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVenue: builder.mutation({
      query: (venueData) => ({
        url:'/venues/',
        data: venueData,
        method: "POST",
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.venue],
    }),
    getAllVenue: builder.query({
      query: (arg: Record<string, any> = {}) => {
        console.log("🔍 getAllVenue query called with params:", arg)
        return {
          url: "/venues/",
          method: "GET",
          params: arg,
        }
      },
      transformResponse: (response: any, meta: any) => {
        console.log("🔄 Raw API response:", response)
        console.log("🔄 Response meta:", meta)

        // Handle different possible response structures
        let venues = []

        if (Array.isArray(response)) {
          venues = response
        } else if (response?.data && Array.isArray(response.data)) {
          venues = response.data
        } else if (response?.venues && Array.isArray(response.venues)) {
          venues = response.venues
        } else if (response?.results && Array.isArray(response.results)) {
          venues = response.results
        } else {
          console.warn("⚠️ Unexpected response structure:", response)
          venues = []
        }

        const transformedData = {
          venues: venues,
          meta: meta || response?.meta || response?.pagination || null,
          total: response?.total || response?.count || venues.length,
        }

        console.log("✅ Transformed response:", transformedData)
        return transformedData
      },
      providesTags: (result) => {
        // Provide tags based on the actual data
        if (result?.venues) {
          return [
            ...result.venues.map(({ id }: any) => ({ type: tagTypes.venue as const, id })),
            { type: tagTypes.venue, id: "LIST" },
          ]
        }
        return [{ type: tagTypes.venue, id: "LIST" }]
      },
    }),
    deleteVenue: builder.mutation({
      query: (id) => ({
        url: `/venue/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.venue],
    }),
  }),
})

export const { useCreateVenueMutation, useGetAllVenueQuery, useDeleteVenueMutation } = venueApi
