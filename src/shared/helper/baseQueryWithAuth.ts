import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';

import {API_URL, APP_ID} from '../config/authConfig';

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers: Headers) => {
    headers.set('app-id', APP_ID);
    return headers;
  },
});

export const baseQueryWithAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};
