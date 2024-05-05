import { ChangeEvent } from "react";
import { AlbumListResponse, useGetAlbums } from "../albums/queries";
import { PhotoListResponse, useGetPhotos } from "./queries";
import { useRouter, useSearchParams } from "next/navigation";
import { URLS } from "@/constants";
import { generateQueryParams } from "@/utils";

export function usePhotos() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    data: photos,
    isLoading: isFetchingPhotos,
    error: getPhotosErr,
  } = useGetPhotos({ albumId: searchParams.get("albumId") || "1" });

  const {
    data: albums,
    isLoading: isFetchingUsers,
    error: getUsersErr,
  } = useGetAlbums({ userId: "" });

  const contents = generateContents(photos?.data || [], albums?.data || []);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    router.push(
      `${URLS.PHOTOS}${generateQueryParams({ albumId: e.target.value })}`,
    );
  }

  return {
    selectedAlbum: searchParams.get("albumId") || "1",
    photos: contents.photos,
    albums: contents.albums,
    isLoading: isFetchingPhotos || isFetchingUsers,
    error: getPhotosErr || getUsersErr,
    onChange,
  };
}

function generateContents(
  photos: PhotoListResponse,
  albums: AlbumListResponse,
) {
  const photoContents = photos.map((photo) => {
    const foundAlbum =
      albums.find((album) => photo.albumId === album.id) ||
      ({} as AlbumListResponse[0]);
    return {
      ...photo,
      album: foundAlbum.title || "-",
    };
  });

  return {
    albums,
    photos: photoContents,
  };
}
