import {
  GET_FIRST_QUESTION,
  GET_FIRST_QUESTION_SUCCESS,
  UPDATE_VAL,
  GPT_SEND_DATA,
  GPT_SEND_DATA_SUCCESS,
  SET_IS_CHAT,
  GET_CURRENT_QA,
  GET_CURRENT_QA_SUCCESS,
  SWITCH_GO_FOME,
  SWITCH_GO_FOME_SUCCESS,
  SET_QA_DATA
} from "./actionTypes";

export const fetchFirstQuestion = () => {
  return {
    type: GET_FIRST_QUESTION
  };
};

export const getFirstQuestionSuccess = (data) => {
  return {
    type: GET_FIRST_QUESTION_SUCCESS,
    payload: data
  };
};


export const updateVal = (answer) => {
  return {
    type: UPDATE_VAL,
    payload: answer
  };
};

export const sendData = (data) => {
  return {
    type: GPT_SEND_DATA,
    payload: data
  };
};

export const sendDataSuccess = (data) => {
  return {
    type: GPT_SEND_DATA_SUCCESS,
    payload: data
  };
};


export const setChat = (status) => {
  return {
    type: SET_IS_CHAT,
    payload: status
  }
}

export const getCurrentQuestion = (data) => {
  return {
    type: GET_CURRENT_QA,
    payload: data
  }
}

export const getCurrentQuestionSuccess = (data) => {
  return {
    type: GET_CURRENT_QA_SUCCESS,
    payload: data
  }
}

export const switchGoForm = (email) => {
  return {
    type: SWITCH_GO_FOME,
    payload: email
  }
}

export const switchGoFormSuccess = (data) => {
  return {
    type: SWITCH_GO_FOME_SUCCESS,
    payload: data
  }
}

export const setData = (data) => {
  return {
    type: SET_QA_DATA,
    payload: data
  }
}

















