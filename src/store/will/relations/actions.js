import { PUT_CONTENT } from "./actionTypes";

export const putContent = (data) => {
  return {
    type: PUT_CONTENT,
    payload: data,
  };
};


