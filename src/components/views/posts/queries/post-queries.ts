import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postsModel } from "./post-models";

export type UsersQuery = {
  page: string;
  pageSize: string;
};

export const postKeys = {
  all: ["POST"],
  list: (query: UsersQuery) => [
    ...postKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
};

export async function getPosts(
  query: UsersQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/posts${generateQueryParams(query)}`);
  return {
    data: postsModel(res),
  };
}

type GetPostsCache = Awaited<ReturnType<typeof getPosts>>;

export function useGetPosts(query: UsersQuery) {
  return useQuery<GetPostsCache, AxiosError<FetchError>, GetPostsCache>(
    postKeys.list(query),
    async () => {
      const fetch = axiosFetch();
      return await getPosts(query, fetch);
    },
  );
}
