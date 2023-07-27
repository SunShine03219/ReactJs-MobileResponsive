import { PUT_CONTENT } from "./actionTypes";

const initialState = {
  content: [],
};

const will = (state = initialState, action) => {
  switch (action.type) {
    case PUT_CONTENT:
      state = {
        ...state,
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
