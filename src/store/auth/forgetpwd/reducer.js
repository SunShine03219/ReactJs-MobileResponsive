import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  CHANGE_PASSWORD,
} from "./actionTypes";

const initialState = {
  loading: false,
  forgetSuccessMsg: null,
  forgetError: null,
};

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        loading: true,
        forgetSuccessMsg: null,
        forgetError: null,
      };
      break;
    case CHANGE_PASSWORD:
      state = {
        ...state,
        loading: true,
        forgetSuccessMsg: null,
        forgetError: null,
      };
      break;
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        forgetSuccessMsg: action.payload,
      };
      break;
    case FORGET_PASSWORD_ERROR:
      state = { 
        ...state, 
        loading: false,
        forgetError: action.payload
       };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default forgetPassword;
