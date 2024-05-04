import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { albumDetailModel, albumsModel } from "./album-models";

export type AlbumsQuery = {
  userId: string;
};

export const albumKeys = {
  all: ["ALBUM"],
  list: (query: AlbumsQuery) => [
    ...albumKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
  detail: () => [...albumKeys.all, "DETAIL"],
};

export async function getAlbums(
  query: AlbumsQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/albums${generateQueryParams(query)}`);
  return {
    data: albumsModel(res),
  };
}

type GetAlbumsCache = Awaited<ReturnType<typeof getAlbums>>;

export function useGetAlbums(query: AlbumsQuery) {
  return useQuery<GetAlbumsCache, AxiosError<FetchError>, GetAlbumsCache>(
    albumKeys.list(query),
    async () => {
      const fetch = axiosFetch();
      return await getAlbums(query, fetch);
    },
  );
}

export async function getAlbumDetail(
  id: string,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/albums/${id}`);
  return {
    data: albumDetailModel(res.data),
  };
}

type AlbumDetailCache = Awaited<ReturnType<typeof getAlbumDetail>>;

export function useGetPhotoDetail({
  id,
  options,
}: {
  id: string;
  options?: UseQueryOptions<
    AlbumDetailCache,
    AxiosError<FetchError>,
    AlbumDetailCache
  >;
}) {
  return useQuery<AlbumDetailCache, AxiosError<FetchError>, AlbumDetailCache>(
    albumKeys.detail(),
    async () => {
      const fetch = axiosFetch();
      return await getAlbumDetail(id, fetch);
    },
    { ...(options ? options : {}) },
  );
}
