import { AxiosResponse } from "axios";

export type PostListResponse = Array<{
  userId: number;
  id: number;
  title: string;
  body: string;
}>;

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
