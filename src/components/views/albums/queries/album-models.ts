import { AxiosResponse } from "axios";

export type AlbumListResponse = Array<AlbumDetailResponse>;

export type AlbumDetailResponse = {
  userId: number;
  id: number;
  title: string;
};

export type AlbumsModel = ReturnType<typeof albumsModel>;
export function albumsModel({ data }: AxiosResponse<AlbumListResponse>) {
  return data.map((item) => ({
    userId: item.userId || 0,
    id: item.id,
    title: item.title || "-",
  }));
}

export type AlbumDetailModel = ReturnType<typeof albumDetailModel>;
export function albumDetailModel(data: AlbumDetailResponse) {
  return {
    userId: data.userId || 0,
    id: data.id,
    title: data.title || "-",
  };
}
