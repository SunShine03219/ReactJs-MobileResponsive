import {
  PUT_CONTENT,
  FETCH_CONTENT,
  GET_CONTENT,
  LOAD_CONTENT,
  LOAD_SUCCESS,
  API_ERROR,
  RESET_CONTENT,
  UPDATE_SUCCESS,
  UPDATE_CONTENT_SUCCESS
} from "./actionTypes";

const initialState = {
  loading: false,
  content: null,
  email: null,
  error: null,
  success: false
};

const will = (state = initialState, action) => {
  switch (action.type) {
    case PUT_CONTENT:
      state = {
        ...state,
        content: action.payload,
        loading: false,
      };
      break;
    case FETCH_CONTENT:
      state = {
        ...state,
        content: action.payload,
        loading: false,
      };
      break;
    case GET_CONTENT:
      state = {
        ...state,
        email: action.payload,
        loading: true,
      };
      break;
    case LOAD_CONTENT:
      state = {
        ...state,
        content: action.payload,
        loading: false,
      };
      break;
    case LOAD_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
      };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    case RESET_CONTENT:
      state = initialState;
      break;
    case UPDATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        success: action.payload
      };
      break;

    case UPDATE_CONTENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        content: action.payload,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default will;
