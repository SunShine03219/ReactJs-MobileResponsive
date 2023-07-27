import {
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_ERROR,
} from "./actionTypes";

const initialState = {
  SuccessMsg: null,
  Error: null,
};

const VerifyEmail = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_EMAIL:
      state = {
        ...state,
        SuccessMsg: null,
        Error: null,
      };
      break;
    case VERIFY_EMAIL_SUCCESS:
      state = {
        ...state,
        SuccessMsg: action.payload.message,
      };
      break;
    case VERIFY_EMAIL_ERROR:
      state = { ...state, Error: action.payload.message };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default VerifyEmail;
