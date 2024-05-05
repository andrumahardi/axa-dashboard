import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { userDetailModel, usersModel } from "./user-models";

export type UsersQuery = {
  page: string;
  pageSize: string;
};

export const userKeys = {
  all: ["USER"],
  list: (query: UsersQuery) => [
    ...userKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
  detail: () => [...userKeys.all, "DETAIL"],
};

export async function getUsers(
  query: UsersQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/users${generateQueryParams(query)}`);
  return {
    data: usersModel(res),
  };
}

type GetUsersCache = Awaited<ReturnType<typeof getUsers>>;

export function useGetUsers(query: UsersQuery) {
  return useQuery<GetUsersCache, AxiosError<FetchError>, GetUsersCache>(
    userKeys.list(query),
    async () => {
      const fetch = axiosFetch();
      return await getUsers(query, fetch);
    },
  );
}

export async function getUserDetail(
  id: string,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/users/${id}`);
  return {
    data: userDetailModel(res.data),
  };
}

type GetUserDetailCache = Awaited<ReturnType<typeof getUserDetail>>;

export function useGetUserDetail({
  id,
  options,
}: {
  id: string;
  options?: UseQueryOptions<
    GetUserDetailCache,
    AxiosError<FetchError>,
    GetUserDetailCache
  >;
}) {
  return useQuery<
    GetUserDetailCache,
    AxiosError<FetchError>,
    GetUserDetailCache
  >(
    userKeys.detail(),
    async () => {
      const fetch = axiosFetch();
      return await getUserDetail(id, fetch);
    },
    { ...(options ? options : {}) },
  );
}
