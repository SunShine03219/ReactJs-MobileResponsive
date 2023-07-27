import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
  LOGIN_ADMIN,
  SET_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  SET_SUCCESS,
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL
} from "./actionTypes";

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginAdmin = (user, history) => {
  return {
    type: LOGIN_ADMIN,
    payload: { user, history },
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: null,
  };
};

export const apiError = (msg) => {
  return {
    type: API_ERROR,
    payload: msg,
  };
};

export const socialLogin = (data, history, type) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { data, history, type },
  };
};

export const setAuthUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const updateUserInfo = (user, userId) => {
  return {
    type: UPDATE_USER,
    payload: {user, userId},
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

export const updateUserFail = (msg) => {
  return {
    type: UPDATE_USER_FAILED,
    payload: msg,
  };
};

export const setSuccess = (state) => {
  return {
    type: SET_SUCCESS,
    payload: state,
  };
};

export const passwordChange = (data, userId) => {
  return {
    type: PASSWORD_CHANGE,
    payload: {data, userId},
  };
};


export const passwordChangeSuccess = (user) => {
  return {
    type: PASSWORD_CHANGE_SUCCESS,
    payload: user,
  };
};

export const passwordChangeFail = (msg) => {
  return {
    type: PASSWORD_CHANGE_FAIL,
    payload: msg,
  };
};













