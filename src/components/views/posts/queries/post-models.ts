import { AxiosResponse } from "axios";
import { UserDetailResponse } from "../../users/queries";

export type PostListResponse = Array<PostDetailResponse>;

export type PostDetailResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostsModel = ReturnType<typeof postsModel>;

export function postsModel({ data }: AxiosResponse<PostListResponse>) {
  return (data || []).map((item) => {
    return {
      id: item.id,
      userId: item.userId || 0,
      title: item.title || "-",
      body: item.body || "-",
    };
  });
}

export type PostDetailModel = ReturnType<typeof postDetailModel>;
export function postDetailModel(
  post: PostDetailResponse,
  user: UserDetailResponse,
) {
  return {
    id: post.id,
    title: post.title || "-",
    body: post.body || "-",
    user: user.name || "-",
    email: user.email || "-",
  };
}
