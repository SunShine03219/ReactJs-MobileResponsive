import { call, put, takeEvery } from "redux-saga/effects";
import API from "../../../helper/api";
import { PUT_CONTENT, GET_CONTENT, UPDATE_CONTENT } from "./actionTypes";
import { loadSuccess, loadContent, apiError, updateSuccess, updateContenSuccess  } from "./actions";

function* saveContent({ payload: data }) {
  try {
    const response = yield call(API.post, `/will`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("petsData", result);
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
      localStorage.setItem("petsData", result);
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
      havePets,
      petsName,
      species,
      caretakerName,
      caretakerCity,
      caretakerState,
      caretakerRelation,
      backupCaretakerName,
      backupCaretakerCity,
      backupCaretakerState,
      backupCaretakerRelation,
      allocate,
      portion,
    } = response.data;
    yield put(
      loadContent({
        havePets,
        petsName,
        species,
        caretakerName,
        caretakerCity,
        caretakerState,
        caretakerRelation,
        backupCaretakerName,
        backupCaretakerCity,
        backupCaretakerState,
        backupCaretakerRelation,
        allocate,
        portion,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* petsSaga() {
  yield takeEvery(PUT_CONTENT, saveContent);
  yield takeEvery(UPDATE_CONTENT, updateContent);
  yield takeEvery(GET_CONTENT, getContent);
}

export default petsSaga;
