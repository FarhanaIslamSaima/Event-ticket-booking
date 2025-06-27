import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-type";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseurl: "http://localhost:8000" }),
  endpoints: () => ({}), // No endpoints defined here, they will be defined in feature-specific APIs
  tagTypes: tagTypesList,
  // No endpoints defined here, they will be defined in feature-specific APIs
});