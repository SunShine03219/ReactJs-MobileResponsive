import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import API from "../../../helper/api";
import { REGISTER_USER } from "./actionTypes";
import { registerUserSuccessful, registerUserFailed } from "./actions";

function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(API.post, `/auth/register`, user);
    yield put(registerUserSuccessful(response));
  } catch (error) {
    const errorMsg = error.response.data.message;
    yield put(registerUserFailed(errorMsg));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
  yield all([fork(watchUserRegister)]);
}

export default accountSaga;
