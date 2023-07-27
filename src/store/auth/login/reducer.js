import {
  LOGIN_ADMIN,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SET_USER,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  SET_SUCCESS,
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  user: null,
  success: false,
  change_success: false,
  message: ''
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, user: null, error: null };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, user: null, error: null };
      break;
    case SET_USER:
      state = { ...state, user: action.payload };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;

    case UPDATE_USER:
      state = { ...state, loading: true };
      break;

    case UPDATE_USER_SUCCESS:
      state = { ...state, loading: false, success: true, user: action.payload };
      break;

    case UPDATE_USER_FAILED:
      state = { ...state, loading: false, success: false, error: action.payload };
      break;


    case SET_SUCCESS:
      state = { ...state, success: action.payload, change_success: action.payload, error: '',  message: ''};
      break;

    case PASSWORD_CHANGE:
      state = { ...state, loading: true };
      break;

    case PASSWORD_CHANGE_SUCCESS:
      state = { ...state, loading: false, change_success: true, message: 'Password Changed Successfully!', user: action.payload };
      break;

    case PASSWORD_CHANGE_FAIL:
      state = { ...state, loading: false, change_success: false, error: action.payload };
      break;


    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
