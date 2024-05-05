import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postDetailModel, postsModel } from "./post-models";
import { getUserDetail } from "../../users/queries";

export type PostsQuery = {
  userId: string;
};

export const postKeys = {
  all: ["POST"],
  list: (query: PostsQuery) => [
    ...postKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
  detail: () => [...postKeys.all, "DETAIL"],
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

export async function getPostDetail(
  id: string,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const post = await fetch.get(`/posts/${id}`);
  const user = await getUserDetail(post?.data?.userId, fetch);

  return {
    data: postDetailModel(post.data || {}, user.data || {}),
  };
}

type GetPostDetailCache = Awaited<ReturnType<typeof getPostDetail>>;

export function useGetPostDetail({
  id,
  options,
}: {
  id: string;
  options?: UseQueryOptions<
    GetPostDetailCache,
    AxiosError<FetchError>,
    GetPostDetailCache
  >;
}) {
  return useQuery<
    GetPostDetailCache,
    AxiosError<FetchError>,
    GetPostDetailCache
  >(
    postKeys.detail(),
    async () => {
      const fetch = axiosFetch();
      return await getPostDetail(id, fetch);
    },
    { ...(options ? options : {}) },
  );
}
