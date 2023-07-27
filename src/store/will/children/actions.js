import {
  PUT_CONTENT,
  PUT_CONTENT_SUCCESS,
  PUT_CONTENT_FAIL,
  UPDATE_CONTENT,
  UPDATE_CONTENT_SUCCESS,
  FETCH_CONTENT,
  GET_CONTENT,
  LOAD_CONTENT,
  LOAD_SUCCESS,
  UPDATE_SUCCESS,
  API_ERROR,
  RESET_CONTENT,
} from "./actionTypes";

export const putContent = (data) => {
  return {
    type: PUT_CONTENT,
    payload: data,
  };
};

export const putContentSuccess = (data) => {
  return {
    type: PUT_CONTENT_SUCCESS,
    payload: data,
  };
};

export const putContentFail = (error) => {
  return {
    type: PUT_CONTENT_FAIL,
    payload: error,
  };
};

export const updateContent = (data) => {
  return {
    type: UPDATE_CONTENT,
    payload: data,
  };
};

export const updateContenSuccess = (data) => {
  return {
    type: UPDATE_CONTENT_SUCCESS,
    payload: data,
  };
};

export const fetchContent = (data) => {
  return {
    type: FETCH_CONTENT,
    payload: data,
  };
};

export const getContent = (email) => {
  return {
    type: GET_CONTENT,
    payload: email,
  };
};

export const loadContent = (data) => {
  return {
    type: LOAD_CONTENT,
    payload: data,
  };
};

export const loadSuccess = (content) => {
  return {
    type: LOAD_SUCCESS,
    payload: content,
  };
};

export const updateSuccess = (status) => {
  return {
    type: UPDATE_SUCCESS,
    payload: status
  };
};


export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const resetContent = () => {
  return {
    type: RESET_CONTENT,
    payload: {},
  };
};
