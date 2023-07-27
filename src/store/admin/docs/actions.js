import { GET_DOCS, GET_DOC, LOAD_SUCCESS, API_ERROR } from "./actionTypes";

export const getDocs = () => {
  return {
    type: GET_DOCS,
    payload: {},
  };
};

export const getUser = () => {
  return {
    type: GET_DOC,
    payload: {},
  };
};

export const loadSuccess = (res) => {
  return {
    type: LOAD_SUCCESS,
    payload: res?.data,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
