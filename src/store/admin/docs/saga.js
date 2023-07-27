import { call, put, takeEvery } from "redux-saga/effects";
import { apiError, loadSuccess } from "./actions";
import API from "../../../helper/api";
import { GET_DOCS } from "./actionTypes";

function* getDocs() {
  try {
    const response = yield call(API.get, `/will`);
    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* userSaga() {
  yield takeEvery(GET_DOCS, getDocs);
}

export default userSaga;
