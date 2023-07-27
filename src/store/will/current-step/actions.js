import {
  SET_CURRENT_STEP,
  SET_EDIT_STATUS
} from "./actionTypes";

export const setCurrentStep = (step) => {
  return {
    type: SET_CURRENT_STEP,
    payload: step,
  };
};

export const setEditStatus = (status) => {
  return {
    type: SET_EDIT_STATUS,
    payload: status,
  };
};




