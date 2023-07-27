import { call, put, takeEvery } from "redux-saga/effects";
import API from "../../../helper/api";
import {
  PUT_CONTENT,
  UPDATE_CONTENT,
  FIND_CONTENT,
  GET_CONTENT,
  RESET_AND_PUT_CONTENT,
} from "./actionTypes";
import { findSuccess, loadSuccess, loadContent, apiError, updateSuccess, updateContentSuccess } from "./actions";
import { resetContent as resetChildren } from "../children/actions";

function* saveContent({ payload: data }) {
  try {
    data.agree = '1'
    const response = yield call(API.post, `/will`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("infoData", result);
    }
    yield put(loadSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateContent({ payload: data }) {
  try {
    data.agree = '1'
    const response = yield call(API.post, `/will`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("infoData", result);
      yield put(updateSuccess(true));
      yield put(updateContentSuccess(data));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* resetContent({ payload: data }) {
  try {
    const response = yield call(API.post, `/will/reset`, data);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("infoData", result);
    }
    yield put(resetChildren());
    yield put(loadSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* detectContent({ payload: data }) {
  try {
    const response = yield call(API.post, `/will/find`, data);
    const res = response.data;
    yield put(findSuccess(res));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* getContent({ payload: email }) {
  try {
    const response = yield call(API.get, `/will/${email}`);
    const { fullName, state, maritalStatus, maritalType, spouseFullName, address, apart_number, city, zip_code } =
      response.data;
    yield put(
      loadContent({
        fullName,
        state,
        maritalStatus,
        maritalType,
        spouseFullName,
        address, 
        apart_number,
        city,
        zip_code
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* infoSaga() {
  yield takeEvery(PUT_CONTENT, saveContent);
  yield takeEvery(UPDATE_CONTENT, updateContent);
  yield takeEvery(RESET_AND_PUT_CONTENT, resetContent);
  yield takeEvery(FIND_CONTENT, detectContent);
  yield takeEvery(GET_CONTENT, getContent);
}

export default infoSaga;
