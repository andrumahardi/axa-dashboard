import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { albumsModel } from "./album-models";

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
