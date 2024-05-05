import { MainContainer } from "@/components/containers";
import { ReactQueryHydrate } from "@/components/hydrate-client";
import { PhotoDetail } from "@/components/views/photos";
import { getPhotoDetail, photoKeys } from "@/components/views/photos/queries";
import { axiosFetch } from "@/utils";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export default async function DetailPostPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(photoKeys.detail(), async () => {
    const fetch = axiosFetch();
    return await getPhotoDetail(params.id || "", fetch);
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <MainContainer>
        <PhotoDetail />
      </MainContainer>
    </ReactQueryHydrate>
  );
}
