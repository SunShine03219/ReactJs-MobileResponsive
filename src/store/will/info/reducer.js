import {
  PUT_CONTENT,
  RESET_AND_PUT_CONTENT,
  FETCH_CONTENT,
  FIND_CONTENT,
  FIND_SUCCESS,
  GET_CONTENT,
  LOAD_CONTENT,
  LOAD_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE_CONTENT_SUCCESS,
  API_ERROR,
  SET_CONTENT,
  RESET_CONTENT,
} from "./actionTypes";

const initialState = {
  loading: false,
  content: null,
  email: null,
  error: null,
  detected: {},
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
    case RESET_AND_PUT_CONTENT:
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
    case FIND_CONTENT:
      state = {
        ...state,
        content: action.payload,
        loading: true,
        detected: {},
      };
      break;
    case FIND_SUCCESS:
      state = {
        ...state,
        loading: false,
        detected: action.payload,
        error: null,
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
        error: null,
        content: action.payload,
      };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    case SET_CONTENT:
      state = {
        ...state,
        detected: action.payload,
      };
      break;
    case RESET_CONTENT:
      state = initialState;
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default will;
