import { useRouter, useSearchParams } from "next/navigation";
import { UserListResponse, useGetUsers } from "../users/queries";
import { AlbumListResponse, useGetAlbums } from "./queries";
import { URLS } from "@/constants";
import { generateQueryParams } from "@/utils";
import { ChangeEvent } from "react";

export function useAlbums() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    data: albums,
    isLoading: isFetchingPosts,
    error: getPostsErr,
  } = useGetAlbums({ userId: searchParams.get("userId") || "1" });

  const {
    data: users,
    isLoading: isFetchingUsers,
    error: getUsersErr,
  } = useGetUsers({ page: "", pageSize: "" });

  const contents = generateContents(albums?.data || [], users?.data || []);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    router.push(
      `${URLS.ALBUMS}${generateQueryParams({ userId: e.target.value })}`,
    );
  }

  return {
    albums: contents.albums,
    users: contents.users,
    selectedUserId: searchParams.get("userId") || "1",
    isLoading: isFetchingPosts || isFetchingUsers,
    error: getPostsErr || getUsersErr,
    onChange,
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
  return {
    users,
    albums: albumContents,
  };
}
