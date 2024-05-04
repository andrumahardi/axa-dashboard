import { AlbumListResponse, useGetAlbums } from "../albums/queries";
import { PhotoListResponse, useGetPhotos } from "./queries";

export function usePhotos({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  const {
    data: photos,
    isLoading: isFetchingPhotos,
    error: getPhotosErr,
  } = useGetPhotos({ page, pageSize });

  const {
    data: albums,
    isLoading: isFetchingUsers,
    error: getUsersErr,
  } = useGetAlbums({ page, pageSize });

  const contents = generateContents(photos?.data || [], albums?.data || []);

  return {
    photos: contents.photos,
    albums: contents.albums,
    isLoading: isFetchingPhotos || isFetchingUsers,
    error: getPhotosErr || getUsersErr,
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
  const albumContents = albums.map((album) => album.title);
  return {
    albums: albumContents,
    photos: photoContents,
  };
}
