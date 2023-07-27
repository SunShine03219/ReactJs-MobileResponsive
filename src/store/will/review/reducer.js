import {
  PUT_CONTENT,
  GET_CONTENT,
  LOAD_SUCCESS,
  API_ERROR,
} from "./actionTypes";

const initialState = {
  loading: false,
  content: null,
  error: null,
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
    case GET_CONTENT:
      state = {
        ...state,
        content: action.payload,
        loading: false,
      };
      break;
    case LOAD_SUCCESS:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default will;
