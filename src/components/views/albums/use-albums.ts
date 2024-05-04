import { UserListResponse, useGetUsers } from "../users/queries";
import { AlbumListResponse, useGetAlbums } from "./queries";

export function useAlbums({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  const {
    data: albums,
    isLoading: isFetchingPosts,
    error: getPostsErr,
  } = useGetAlbums({ page, pageSize });

  const {
    data: users,
    isLoading: isFetchingUsers,
    error: getUsersErr,
  } = useGetUsers({ page, pageSize });

  const contents = generateContents(albums?.data || [], users?.data || []);

  return {
    albums: contents.albums,
    users: contents.users,
    isLoading: isFetchingPosts || isFetchingUsers,
    error: getPostsErr || getUsersErr,
  };
}

function generateContents(albums: AlbumListResponse, users: UserListResponse) {
  const albumContents = albums.map((post) => {
    const foundUser =
      users.find((user) => post.userId === user.id) ||
      ({} as UserListResponse[0]);
    return {
      ...post,
      user: foundUser.name || "-",
    };
  });
  const userContents = users.map((user) => user.name);
  return {
    users: userContents,
    albums: albumContents,
  };
}
