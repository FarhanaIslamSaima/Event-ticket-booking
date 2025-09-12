import { tagTypes } from "../tag-type";
import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create an order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/",
        method: "POST",
        data: orderData,
        contentType: "application/json",
      
      }),
      invalidatesTags: [tagTypes.order],
    }),

    // Get orders
    getOrders: builder.query({
      query: (params) => ({
        url: "/orders/",
        method: "GET",
        params, // query params like ?id=1
      }),
      providesTags: [tagTypes.order],
      transformResponse: (response: any, meta, arg) => {
        // If an ID was passed, return only the first matching order
        if (arg?.id) {
          return response.results?.[0] ?? null;
        }
        // Otherwise, return all results
        return response.results ?? [];
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = orderApi;
export { orderApi };
