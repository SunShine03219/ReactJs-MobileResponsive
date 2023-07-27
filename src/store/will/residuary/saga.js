import { call, put, takeEvery } from "redux-saga/effects";
import API from "../../../helper/api";
import { PUT_CONTENT, GET_CONTENT, UPDATE_CONTENT } from "./actionTypes";
import { loadSuccess, loadContent, apiError, updateSuccess, updateContenSuccess } from "./actions";

function* saveContent({ payload: data }) {
  try {
    let tempData = data;
    if (!data.backupEstate) tempData = { ...tempData, backupEstate: [""] };
    if (!data.backupBeneficiaries)
      tempData = { ...tempData, backupBeneficiaries: [""] };
    if (!data.backupBeneficiaryRelations)
      tempData = { ...tempData, backupBeneficiaryRelations: [""] };
    const response = yield call(API.post, `/will`, tempData);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("residuaryData", result);
    }
    yield put(loadSuccess(response));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateContent({ payload: data }) {
  try {
    let tempData = data;
    if (!data.backupEstate) tempData = { ...tempData, backupEstate: [""] };
    if (!data.backupBeneficiaries)
      tempData = { ...tempData, backupBeneficiaries: [""] };
    if (!data.backupBeneficiaryRelations)
      tempData = { ...tempData, backupBeneficiaryRelations: [""] };
    const response = yield call(API.post, `/will`, tempData);
    const { success, result } = response.data;
    if (success) {
      localStorage.setItem("residuaryData", result);
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
      distribution,
      estate,
      beneficiaries,
      beneficiaryRelations,
      backupEstate,
      backupBeneficiaries,
      backupBeneficiaryRelations,
    } = response.data;
    yield put(
      loadContent({
        distribution,
        estate,
        beneficiaries,
        beneficiaryRelations,
        backupEstate,
        backupBeneficiaries,
        backupBeneficiaryRelations,
      })
    );
  } catch (error) {
    yield put(apiError(error));
  }
}

function* residuarySaga() {
  yield takeEvery(PUT_CONTENT, saveContent);
  yield takeEvery(UPDATE_CONTENT, updateContent);
  yield takeEvery(GET_CONTENT, getContent);
}

export default residuarySaga;
