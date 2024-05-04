import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { photosModel } from "./photo-models";

export type PhotosQuery = {
  albumId: string;
};

export const photoKeys = {
  all: ["PHOTO"],
  list: (query: PhotosQuery) => [
    ...photoKeys.all,
    "LIST",
    generateQueryParams(query),
  ],
};

export async function getPhotos(
  query: PhotosQuery,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const res = await fetch.get(`/photos${generateQueryParams(query)}`);
  return {
    data: photosModel(res),
  };
}

type GetPhotosCache = Awaited<ReturnType<typeof getPhotos>>;

export function useGetPhotos(query: PhotosQuery) {
  return useQuery<GetPhotosCache, AxiosError<FetchError>, GetPhotosCache>(
    photoKeys.list(query),
    async () => {
      const fetch = axiosFetch();
      return await getPhotos(query, fetch);
    },
  );
}
