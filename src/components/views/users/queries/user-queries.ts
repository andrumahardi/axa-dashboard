import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usersModel } from "./user-models";

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
};

export async function getUsers(
  query: UsersQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/users${generateQueryParams(query)}`);
  return {
    data: usersModel(res),
    meta: res.data.meta,
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
