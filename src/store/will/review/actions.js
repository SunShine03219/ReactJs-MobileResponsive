import {
  PUT_CONTENT,
  GET_CONTENT,
  LOAD_SUCCESS,
  API_ERROR,
} from "./actionTypes";

export const putContent = (data) => {
  return {
    type: PUT_CONTENT,
    payload: data,
  };
};

export const getContent = (email) => {
  return {
    type: GET_CONTENT,
    payload: email,
  };
};

export const loadSuccess = (content) => {
  return {
    type: LOAD_SUCCESS,
    payload: content,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
