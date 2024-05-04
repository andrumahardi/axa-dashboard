import { MainContainer } from "@/components/containers";
import { ReactQueryHydrate } from "@/components/hydrate-client";
import { PostDetail } from "@/components/views/posts";
import { getPostDetail, postKeys } from "@/components/views/posts/queries";
import {
  getPostComments,
  postCommentKeys,
} from "@/components/views/posts/queries/post-comment-queries";
import { getUserDetail, userKeys } from "@/components/views/users/queries";
import { axiosFetch } from "@/utils";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export default async function DetailPostPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(postKeys.detail(), async () => {
      const fetch = axiosFetch();
      return await getPostDetail(params.id || "", fetch);
    }),
    queryClient.prefetchQuery(
      postCommentKeys.list({ postId: String(params.id || "") }),
      async () => {
        const fetch = axiosFetch();
        return await getPostComments(
          { postId: String(params.id || "") },
          fetch,
        );
      },
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <MainContainer>
        <PostDetail />
      </MainContainer>
    </ReactQueryHydrate>
  );
}
