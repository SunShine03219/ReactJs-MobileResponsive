import { call, put, takeEvery } from "redux-saga/effects";
import API from "../../../helper/api";
import { PUT_CONTENT, GET_CONTENT, UPDATE_CONTENT } from "./actionTypes";
import { loadSuccess, loadContent, apiError, updateSuccess, updateContenSuccess } from "./actions";

function* saveContent({ payload: data }) {
  try {
    const response = yield call(API.post, `/will`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("executorData", result);
    }
    yield put(loadSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateContent({ payload: data }) {
  try {
    const response = yield call(API.post, `/will`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("executorData", result);
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
      executorName,
      executorCity,
      executorState,
      executorRelation,
      backupExecutorName,
      backupExecutorCity,
      backupExecutorState,
      backupExecutorRelation,
    } = response.data;
    yield put(
      loadContent({
        executorName,
        executorCity,
        executorState,
        executorRelation,
        backupExecutorName,
        backupExecutorCity,
        backupExecutorState,
        backupExecutorRelation,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* executorSaga() {
  yield takeEvery(PUT_CONTENT, saveContent);
  yield takeEvery(UPDATE_CONTENT, updateContent);
  yield takeEvery(GET_CONTENT, getContent);
}

export default executorSaga;
