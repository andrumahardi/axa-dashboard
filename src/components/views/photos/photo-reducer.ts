import { Reducer } from "react";

export type State = {
  album: string;
  title: string;

  image: File | null;
  url: string;
  imageName: string;

  thumbnail: File | null;
  thumbnailUrl: string;
  thumbnailName: string;
};

export type Action =
  | {
      [FieldName in keyof State]: {
        type: "change_file";
        name: FieldName;
        value: State[FieldName];
      };
    }[keyof State]
  | { type: "reset"; value: State }
  | {
      type: "remove_file";
      name: keyof Pick<State, "image" | "thumbnail">;
      value: string;
    };

export const initialState: State = {
  album: "",
  title: "",

  image: null,
  url: "",
  imageName: "",

  thumbnail: null,
  thumbnailUrl: "",
  thumbnailName: "",
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "change_file": {
      if (action.name === "image") {
        const newState = {
          ...state,
          url: (action.value && URL.createObjectURL(action.value)) || "",
          imageName: action.value?.name || "",
          image: action.value,
        };
        return {
          ...newState,
        };
      }

      if (action.name === "thumbnail") {
        const newState = {
          ...state,
          thumbnailUrl:
            (action.value && URL.createObjectURL(action.value)) || "",
          thumbnailName: action.value?.name || "",
          thumbnail: action.value,
        };
        return {
          ...newState,
        };
      }
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case "reset": {
      return {
        ...state,
        ...action.value,
      };
    }
    case "remove_file": {
      if (action.name === "image") {
        return {
          ...state,
          url: action.value,
          imageName: "",
          image: null,
        };
      }

      if (action.name === "thumbnail") {
        return {
          ...state,
          thumbnailUrl: action.value,
          thumbnailName: "",
          thumbnail: null,
        };
      }
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
