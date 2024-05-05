import { AxiosError } from "axios";
import { FetchError } from "@/types";
import { generateQueryParams, axiosFetch } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { postsCommentsModel } from "./post-comment-models";

export type PostCommentsQuery = {
  postId: string;
};

export const postCommentKeys = {
  all: ["POST_COMMENT"],
  list: (query: PostCommentsQuery) => [
    ...postCommentKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
};

export async function getPostComments(
  query: PostCommentsQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/comments${generateQueryParams(query)}`);
  return {
    data: postsCommentsModel(res),
  };
}

type GetPostCommentsCache = Awaited<ReturnType<typeof getPostComments>>;

export function useGetPostComments(query: PostCommentsQuery) {
  return useQuery<
    GetPostCommentsCache,
    AxiosError<FetchError>,
    GetPostCommentsCache
  >(postCommentKeys.list(query), async () => {
    const fetch = axiosFetch();
    return await getPostComments(query, fetch);
  });
}
