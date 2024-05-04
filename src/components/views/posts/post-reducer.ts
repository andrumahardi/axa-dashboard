import { Reducer } from "react";

export type State = {
  title: string;
  body: string;
  user: string;
  email: string;
};

type Action =
  | {
      [FieldName in keyof State]: {
        name: FieldName;
        value: State[FieldName];
      };
    }[keyof State]
  | { name: "reset"; value: State };

export const initialState: State = {
  title: "",
  body: "",
  user: "",
  email: "",
};

export const reducer: Reducer<State, Action> = (state, action) => {
  if (action.name === "reset") {
    return {
      ...state,
      ...action.value,
    };
  }

  return {
    ...state,
    [action.name]: action.value,
  };
};
