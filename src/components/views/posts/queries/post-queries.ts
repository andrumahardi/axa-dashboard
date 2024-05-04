import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postsModel } from "./post-models";

export type PostsQuery = {
  page: string;
  pageSize: string;
};

export const postKeys = {
  all: ["POST"],
  list: (query: PostsQuery) => [
    ...postKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
};

export async function getPosts(
  query: PostsQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/posts${generateQueryParams(query)}`);
  return {
    data: postsModel(res),
  };
}

type GetPostsCache = Awaited<ReturnType<typeof getPosts>>;

export function useGetPosts(query: PostsQuery) {
  return useQuery<GetPostsCache, AxiosError<FetchError>, GetPostsCache>(
    postKeys.list(query),
    async () => {
      const fetch = axiosFetch();
      return await getPosts(query, fetch);
    },
  );
}
