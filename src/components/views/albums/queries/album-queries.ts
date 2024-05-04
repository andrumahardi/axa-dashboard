import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { albumsModel } from "./album-models";

export type albumsQuery = {
  page: string;
  pageSize: string;
};

export const userKeys = {
  all: ["ALBUM"],
  list: (query: albumsQuery) => [
    ...userKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
};

export async function getAlbums(
  query: albumsQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/albums${generateQueryParams(query)}`);
  return {
    data: albumsModel(res),
  };
}

type GetAlbumsCache = Awaited<ReturnType<typeof getAlbums>>;

export function useGetAlbums(query: albumsQuery) {
  return useQuery<GetAlbumsCache, AxiosError<FetchError>, GetAlbumsCache>(
    userKeys.list(query),
    async () => {
      const fetch = axiosFetch();
      return await getAlbums(query, fetch);
    },
  );
}
