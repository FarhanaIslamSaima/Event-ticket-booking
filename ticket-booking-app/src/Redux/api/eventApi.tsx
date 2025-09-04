import { url } from "inspector";
import {tagTypes} from "../tag-type";
import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (arg: Record<string, any> = {}) => ({
      url:"/events/",
      method: "GET",
      params: arg,
      providesTags: [tagTypes.event],
      }),
      transformResponse: (response: any, meta, arg) => {
        // If an ID was passed, return only the first matching event
        if (arg?.id) {
          return response.results?.[0] ?? null;
        }
        // Otherwise, return all results
        return response.results ?? [];
      },
     
    }),
    createEvent: builder.mutation({
      query: (data) => ({
      
        url: "/events/",
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const { useGetEventsQuery, useCreateEventMutation } = eventApi;
