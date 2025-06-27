import { url } from "inspector";
import {tagTypes} from "../tag-type";
import { baseApi } from "./baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => ({
      url:"/events",
      method: "GET",
      providesTags: [tagTypes.event],
      })
    }),
    createEvent: builder.mutation({
      query: (data) => ({
      
        url: "/events",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.event],
    }),
  }),
});

export const { useGetEventsQuery, useCreateEventMutation } = eventApi;
