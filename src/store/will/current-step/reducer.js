import {
  SET_CURRENT_STEP,
  SET_EDIT_STATUS
} from "./actionTypes";

const initialState = {
  loading: false,
  currentStep: 0,
  edit_status: false
};

const currentStep = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_STEP:
      state = {
        ...state,
        currentStep: action.payload
      };
      break;
    case SET_EDIT_STATUS:
      state = {
        ...state,
        edit_status: action.payload
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default currentStep;
