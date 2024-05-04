import { UserListResponse, useGetUsers } from "../users/queries";
import { PostListResponse, useGetPosts } from "./queries";

export function usePosts({
  page,
  pageSize,
}: {
  page: string;
  pageSize: string;
}) {
  const {
    data: posts,
    isLoading: isFetchingPosts,
    error: getPostsErr,
  } = useGetPosts({ page, pageSize });

  const {
    data: users,
    isLoading: isFetchingUsers,
    error: getUsersErr,
  } = useGetUsers({ page, pageSize });

  const contents = generateContents(posts?.data || [], users?.data || []);

  return {
    posts: contents.posts,
    users: contents.users,
    isLoading: isFetchingPosts || isFetchingUsers,
    error: getPostsErr || getUsersErr,
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
  const userContents = users.map((user) => user.name);
  return {
    users: userContents,
    posts: postContents,
  };
}
