
import { url } from "inspector";
import {tagTypes} from "../tag-type";
import { baseApi } from "./baseApi";

export const venueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVenue: builder.mutation({
      query: (venueData) => ({
        url: "/venue/create/",
        data: venueData,
        method: "POST",
        contentType: "multipart/form-data",
      
      }),
      invalidatesTags: [tagTypes.venue],
    }),
  }),
});

export const { useCreateVenueMutation } = venueApi;
