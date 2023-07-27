import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import API from "../../../helper/api";
import { VERIFY_EMAIL } from "./actionTypes";
import { verifyEmailSuccess, verifyEmailError} from "./actions";
import {loginSuccess} from '../login/actions'
import jwt from "jwt-decode";

function* verifyEmail({ payload: { token, history } }) {
  try {
    const response = yield call(API.post, `/verify-email`, token);
    if (response.data.success) {
      yield put(verifyEmailSuccess(response.data.message));
      localStorage.setItem("authUser", response.data.access_token);
      const userData = jwt(response.data.access_token);
      yield put(loginSuccess(userData));  
      history.push("/will");
    } else {
      yield put(verifyEmailError(response.data));
      history.push("/login");
    }
  } catch (error) {
    yield put(verifyEmailError(error));
  }
}

export function* watchVerifyEmailProcess() {
  yield takeEvery(VERIFY_EMAIL, verifyEmail);
}

function* VerifyEmailSaga() {
  yield all([fork(watchVerifyEmailProcess)]);
}

export default VerifyEmailSaga;
