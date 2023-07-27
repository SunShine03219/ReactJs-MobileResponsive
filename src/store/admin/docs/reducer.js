import { GET_DOCS, GET_DOC, LOAD_SUCCESS, API_ERROR } from "./actionTypes";

const initialState = {
  error: "",
  docs: [],
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_DOC:
      state = {
        ...state,
        loading: false,
      };
      break;
    case LOAD_SUCCESS:
      state = {
        ...state,
        docs: action.payload,
        loading: true,
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

export default login;
