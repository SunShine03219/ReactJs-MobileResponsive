import {
  GET_FIRST_QUESTION,
  GET_FIRST_QUESTION_SUCCESS,
  UPDATE_VAL,
  GPT_SEND_DATA,
  GPT_SEND_DATA_SUCCESS,
  SET_IS_CHAT,
  GET_CURRENT_QA,
  GET_CURRENT_QA_SUCCESS,
  SET_QA_DATA
} from "./actionTypes";

const initialState = {
  loading: false,
  qadata: [],
  isChat: false,
};

const chatGpt = (state = initialState, action) => {
  switch (action.type) {
    case GET_FIRST_QUESTION:
      state = {
        ...state,
        loading: true,
      };
      break;
    case GET_FIRST_QUESTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        qadata: [...state.qadata, action.payload]
      };
      break;

    case UPDATE_VAL:
      const myArray = state.qadata
      const lastIndex = myArray.length - 1;
      const updatedObject = { ...myArray[lastIndex], answer: action.payload };
      const newArray = [...myArray.slice(0, lastIndex), updatedObject];
      state = {
        ...state,
        loading: false,
        qadata: newArray
      };
      break;

    case GPT_SEND_DATA:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GPT_SEND_DATA_SUCCESS:
      state = {
        ...state,
        loading: false,
        qadata: [...state.qadata, action.payload]
      };
      break;

    case SET_QA_DATA:
      state = {
        ...state,
        loading: false,
        qadata: action.payload
      };
      break;

    case GET_CURRENT_QA:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_CURRENT_QA_SUCCESS:
      state = {
        ...state,
        loading: false,
        qadata: action.payload
      };
      break;


    case SET_IS_CHAT:
      state = {
        ...state,
        isChat: action.payload
      };
      break;


    default:
      state = { ...state };
      break;
  }
  return state;
};

export default chatGpt;
