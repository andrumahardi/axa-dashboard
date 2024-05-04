import { FetchError } from "@/types";
import { axiosFetch, generateQueryParams } from "@/utils";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { photoDetailModel, photosModel } from "./photo-models";
import { getAlbumDetail, getAlbums } from "../../albums/queries";

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
  detail: () => [...photoKeys.all, "DETAIL"],
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

export async function getPhotoDetail(
  id: string,
  fetch: ReturnType<typeof axiosFetch>,
) {
  const photo = await fetch.get(`/photos/${id}`);
  const album = await getAlbumDetail(photo?.data?.id || "", fetch);
  return {
    data: photoDetailModel(photo.data, album.data),
  };
}

type GetPhotoDetailCache = Awaited<ReturnType<typeof getPhotoDetail>>;

export function useGetPhotoDetail({
  id,
  options,
}: {
  id: string;
  options?: UseQueryOptions<
    GetPhotoDetailCache,
    AxiosError<FetchError>,
    GetPhotoDetailCache
  >;
}) {
  return useQuery<
    GetPhotoDetailCache,
    AxiosError<FetchError>,
    GetPhotoDetailCache
  >(
    photoKeys.detail(),
    async () => {
      const fetch = axiosFetch();
      return await getPhotoDetail(id, fetch);
    },
    { ...(options ? options : {}) },
  );
}
