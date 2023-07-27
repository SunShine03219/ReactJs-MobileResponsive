import { GET_USERS, GET_USER, LOAD_SUCCESS, API_ERROR } from "./actionTypes";

export const getUsers = () => {
  return {
    type: GET_USERS,
    payload: {},
  };
};

export const getUser = () => {
  return {
    type: GET_USER,
    payload: {},
  };
};

export const loadSuccess = (res) => {
  return {
    type: LOAD_SUCCESS,
    payload: res,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};
