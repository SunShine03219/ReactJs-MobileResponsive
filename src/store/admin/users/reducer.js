import { GET_USERS, GET_USER, LOAD_SUCCESS, API_ERROR } from "./actionTypes";

const initialState = {
  error: "",
  users: [],
  loading: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case GET_USER:
      state = {
        ...state,
        loading: false,
      };
      break;
    case LOAD_SUCCESS:
      state = {
        ...state,
        users: action.payload,
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
