import { AxiosResponse } from "axios";

export type PhotoListResponse = Array<{
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}>;

export type PhotosModel = ReturnType<typeof photosModel>;
export function photosModel({ data }: AxiosResponse<PhotoListResponse>) {
  return data.map((item) => ({
    albumId: item.albumId || 0,
    id: item.id,
    title: item.title || "-",
    url: item.url || "-",
    thumbnailUrl: item.thumbnailUrl || "-",
  }));
}
