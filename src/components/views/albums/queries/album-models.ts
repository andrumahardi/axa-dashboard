import { AxiosResponse } from "axios";

export type AlbumListResponse = Array<{
  userId: number;
  id: number;
  title: string;
}>;

export type AlbumsModel = ReturnType<typeof albumsModel>;
export function albumsModel({ data }: AxiosResponse<AlbumListResponse>) {
  return data.map((item) => ({
    userId: item.userId || 0,
    id: item.id,
    title: item.title || "-",
  }));
}
