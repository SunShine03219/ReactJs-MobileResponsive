import {
  PUT_CONTENT,
  UPDATE_CONTENT,
  UPDATE_CONTENT_SUCCESS,
  RESET_AND_PUT_CONTENT,
  FETCH_CONTENT,
  FIND_CONTENT,
  FIND_SUCCESS,
  GET_CONTENT,
  LOAD_CONTENT,
  LOAD_SUCCESS,
  UPDATE_SUCCESS,
  API_ERROR,
  SET_CONTENT,
  RESET_CONTENT,
} from "./actionTypes";

export const putContent = (data) => {
  return {
    type: PUT_CONTENT,
    payload: data,
  };
};

export const updateContent = (data) => {
  return {
    type: UPDATE_CONTENT,
    payload: data,
  };
};

export const updateContentSuccess = (data) => {
  return {
    type: UPDATE_CONTENT_SUCCESS,
    payload: data,
  };
};

export const resetAndPutContent = (data) => {
  return {
    type: RESET_AND_PUT_CONTENT,
    payload: data,
  };
};

export const fetchContent = (data) => {
  return {
    type: FETCH_CONTENT,
    payload: data,
  };
};

export const findContent = (data) => {
  return {
    type: FIND_CONTENT,
    payload: data,
  };
};

export const findSuccess = (data) => {
  return {
    type: FIND_SUCCESS,
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

export const setContent = (status) => {
  return {
    type: SET_CONTENT,
    payload: status,
  };
};

export const resetContent = (status) => {
  return {
    type: RESET_CONTENT,
    payload: status,
  };
};
