import { AxiosResponse } from "axios";

export type PostCommentsResponse = Array<PostCommentDetailResponse>;

export type PostCommentDetailResponse = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type PostCommentsModel = ReturnType<typeof postsCommentsModel>;

export function postsCommentsModel({
  data,
}: AxiosResponse<PostCommentsResponse>) {
  return (data || []).map((item) => {
    return {
      postId: item.postId,
      id: item.id,
      name: item.name || "-",
      email: item.email || "-",
      body: item.body || "-",
    };
  });
}
