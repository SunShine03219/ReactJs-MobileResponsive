import { call, put, takeEvery } from "redux-saga/effects";
import API from "../../../helper/api";
import { PUT_CONTENT, GET_CONTENT, UPDATE_CONTENT } from "./actionTypes";
import { loadContent, apiError, updateSuccess, putContentSuccess, putContentFail, updateContenSuccess } from "./actions";

function* saveContent({ payload: data }) {
  try {
    const response = yield call(API.post, `/will`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("childrenData", result);
      yield put(putContentSuccess(data));
    } else {
      yield put(putContentFail(response));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateContent({ payload: data }) {
  try {
    const response = yield call(API.post, `/will`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("childrenData", result);
      yield put(updateSuccess(true));
      yield put(updateContenSuccess(data));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getContent({ payload: email }) {
  try {
    const response = yield call(API.get, `/will/${email}`);
    const {
      haveChildren,
      children,
      ageAllowed,
      guardianName,
      guardianCity,
      guardianState,
      guardianRelation,
      backupGuardianName,
      backupGuardianCity,
      backupGuardianState,
      backupGuardianRelation,
      number,
    } = response.data;
    yield put(
      loadContent({
        haveChildren,
        children,
        ageAllowed,
        guardianName,
        guardianCity,
        guardianState,
        guardianRelation,
        backupGuardianName,
        backupGuardianCity,
        backupGuardianState,
        backupGuardianRelation,
        number,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* childrenSaga() {
  yield takeEvery(PUT_CONTENT, saveContent);
  yield takeEvery(UPDATE_CONTENT, updateContent);
  yield takeEvery(GET_CONTENT, getContent);
}

export default childrenSaga;
