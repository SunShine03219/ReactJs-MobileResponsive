import {
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
} from "./actionTypes";

export const verifyEmail = (token, history) => {
  return {
    type: VERIFY_EMAIL,
    payload: { token, history },
  };
};

export const verifyEmailSuccess = (res) => {
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload: res,
  };
};

export const verifyEmailError = (res) => {
  return {
    type: VERIFY_EMAIL_ERROR,
    payload: res,
  };
};
