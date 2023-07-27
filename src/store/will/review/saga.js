import { call, put, takeEvery } from "redux-saga/effects";
import API from "../../../helper/api";
import { PUT_CONTENT } from "./actionTypes";
import { loadSuccess, apiError } from "./actions";

function* sendData({ payload: data }) {
  try {
    const response = yield call(API.post, `/will`, data);
    yield put(loadSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* reviewSaga() {
  yield takeEvery(PUT_CONTENT, sendData);
}

export default reviewSaga;
