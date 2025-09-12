import { tagTypes } from "../tag-type";
import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/payment/initiate/",
        method: "POST",
        data: paymentData, // use `body` instead of `data` in RTK Query
      }),
      transformResponse: (response: any, meta, arg) => {
        return response; // transform as needed
      },
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useInitiatePaymentMutation } = paymentApi;
export { paymentApi };
