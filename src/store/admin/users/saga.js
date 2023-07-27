import { call, put, takeEvery } from "redux-saga/effects";
import { apiError, loadSuccess } from "./actions";
import API from "../../../helper/api";
import { GET_USERS } from "./actionTypes";

function* getUsers() {
  try {
    const response = yield call(API.get, `/users`);
    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* userSaga() {
  yield takeEvery(GET_USERS, getUsers);
}

export default userSaga;
