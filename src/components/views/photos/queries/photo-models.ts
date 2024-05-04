import { AxiosResponse } from "axios";
import { AlbumDetailResponse } from "../../albums/queries";

export type PhotoListResponse = Array<PhotoDetailResponse>;

export type PhotoDetailResponse = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

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

export type PhotoDetailModel = ReturnType<typeof photoDetailModel>;
export function photoDetailModel(
  photo: PhotoDetailResponse,
  album: AlbumDetailResponse,
) {
  return {
    id: photo.id,
    title: photo.title || "-",
    url: photo.url || "-",
    thumbnailUrl: photo.thumbnailUrl || "-",
    album: album.title,
  };
}
