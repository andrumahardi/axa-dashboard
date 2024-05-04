import { useParams } from "next/navigation";
import { useGetPostDetail } from "./queries";
import { ChangeEvent, useReducer, useState } from "react";
import { State, initialState, reducer } from "./post-reducer";
import { useGetPostComments } from "./queries/post-comment-queries";

export function usePost() {
  const params = useParams();
  const [toggleEdit, setToggleEdit] = useState(false);
  const { data: postDetail } = useGetPostDetail({
    id: (params.id || "") as string,
  });
  const { data: postComments } = useGetPostComments({
    postId: String(params.id || ""),
  });

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    user: postDetail?.data?.user || "-",
    email: postDetail?.data?.email || "-",
    title: postDetail?.data?.title || "-",
    body: postDetail?.data?.body || "-",
  });

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    dispatch({
      name: e.target.name as keyof State,
      value: e.target.value,
    });
  }

  function onSave() {
    console.log("ok");
  }

  function onCancel() {
    dispatch({
      name: "reset",
      value: {
        user: postDetail?.data?.user || "-",
        email: postDetail?.data?.email || "-",
        title: postDetail?.data?.title || "-",
        body: postDetail?.data?.body || "-",
      },
    });
    setToggleEdit(!toggleEdit);
  }

  return {
    state,
    postComments: postComments?.data || [],
    toggleEdit,
    setToggleEdit,
    onChange,
    onSave,
    onCancel,
  };
}
