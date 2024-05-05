import { useParams } from "next/navigation";
import { useGetPhotoDetail } from "./queries";
import { ChangeEvent, useReducer, useState } from "react";
import { reducer, initialState, State, Action } from "./photo-reducer";

export function usePhoto() {
  const params = useParams();
  const [toggleEdit, setToggleEdit] = useState(false);
  const { data: photoDetail } = useGetPhotoDetail({
    id: (params.id || "") as string,
  });

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    title: photoDetail?.data?.title || "-",
    url: photoDetail?.data?.url || "-",
    thumbnailUrl: photoDetail?.data?.thumbnailUrl || "-",
    album: photoDetail?.data?.album || "-",
  });

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    dispatch({
      type: "change_file",
      name: e.target.name as keyof State & "reset",
      value: e.target.value,
    });
  }

  function onChangeFile(
    name: keyof Pick<State, "image" | "thumbnail">,
    files: FileList | null,
  ) {
    if (files?.length) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        dispatch({
          type: "change_file",
          name: name,
          value: files ? files[0] || null : null,
        });
      };
    } else {
      removeFile(name);
    }
  }

  function removeFile(name: keyof Pick<State, "image" | "thumbnail">) {
    let originalUrl = "";

    if (name === "image") originalUrl = photoDetail?.data?.url || "";
    if (name === "thumbnail")
      originalUrl = photoDetail?.data?.thumbnailUrl || "";

    dispatch({
      type: "remove_file",
      name,
      value: originalUrl,
    });
  }

  function onSave() {
    console.log("ok");
  }

  function onCancel() {
    dispatch({
      type: "reset",
      value: {
        ...initialState,
        title: photoDetail?.data?.title || "-",
        url: photoDetail?.data?.url || "-",
        thumbnailUrl: photoDetail?.data?.thumbnailUrl || "-",
        album: photoDetail?.data?.album || "-",
      },
    });
    setToggleEdit(!toggleEdit);
  }

  return {
    state,
    toggleEdit,
    setToggleEdit,
    onChange,
    onChangeFile,
    onSave,
    onCancel,
    removeFile,
  };
}
