import { useRouter, useSearchParams } from "next/navigation";
import { UserListResponse, useGetUsers } from "../users/queries";
import { PostListResponse, useGetPosts } from "./queries";
import { URLS } from "@/constants";
import { generateQueryParams } from "@/utils";
import { ChangeEvent } from "react";

export function usePosts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    data: posts,
    isLoading: isFetchingPosts,
    error: getPostsErr,
  } = useGetPosts({ userId: searchParams.get("userId") || "1" });

  const {
    data: users,
    isLoading: isFetchingUsers,
    error: getUsersErr,
  } = useGetUsers({ page: "", pageSize: "" });

  const contents = generateContents(posts?.data || [], users?.data || []);

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    router.push(
      `${URLS.POSTS}${generateQueryParams({ userId: e.target.value })}`,
    );
  }

  return {
    posts: contents.posts,
    users: contents.users,
    isLoading: isFetchingPosts || isFetchingUsers,
    error: getPostsErr || getUsersErr,
    selectedUserId: searchParams.get("userId") || "1",
    onChange,
  };
}

function generateContents(posts: PostListResponse, users: UserListResponse) {
  const postContents = posts.map((post) => {
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
    posts: postContents,
  };
}
