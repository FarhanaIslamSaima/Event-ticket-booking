import {tagTypes} from "../tag-type";
import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/categories",
        method: "GET",
        providesTags: [tagTypes.category],
        params: arg,
      }),
    }),

  }),
});
export const { useGetCategoriesQuery } = categoryApi;