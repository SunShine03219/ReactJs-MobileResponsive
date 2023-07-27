import { call, put, takeEvery } from "redux-saga/effects";
import jwt from "jwt-decode";
// Login Redux States
import API from "../../../helper/api";
import { LOGIN_ADMIN, LOGIN_USER, LOGOUT_USER, UPDATE_USER, PASSWORD_CHANGE } from "./actionTypes";
import { apiError, loginSuccess, updateUserSuccess, updateUserFail, passwordChangeSuccess, passwordChangeFail } from "./actions";
import {
  AssetsAction,
  ChildrenAction,
  DigitalAction,
  ExecutorAction,
  GiftsAction,
  InfoAction,
  PassdownAction,
  PetsAction,
  ProvisionsAction,
  ResiduaryAction,
} from "../../actions";

function* passwordChange({ payload: {data, userId} }) {
  try {
    const response = yield call(API.put, `/users/password-change/${userId}`, data);
    if (response.data.success) {
      localStorage.setItem("authUser", response.data.access_token);
      const userData = jwt(response.data.access_token);
      yield put(passwordChangeSuccess(userData));
    } else {
      yield put(passwordChangeFail(response.data.message));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* updateUser({ payload: { user, userId } }) {
  try {
    const response = yield call(API.put, `/users/${userId}`, user);
    if (response.data.success) {
      localStorage.setItem("authUser", response.data.access_token);
      const userData = jwt(response.data.access_token);
      yield put(updateUserSuccess(userData));
    } else {
      yield put(updateUserFail(response.data.message));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* loginAdmin({ payload: { user, history } }) {
  try {
    const response = yield call(API.post, `/auth/login`, user);
    localStorage.setItem("authUser", response.data.access_token);
    const userData = jwt(response.data.access_token);
    yield put(loginSuccess(userData));
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(API.post, `/auth/login`, user);
    const res_user = response.data["user"];
    const res_will = response.data["will"];
    if (res_will) {
      const {
        assets_token,
        children_token,
        digital_token,
        executor_token,
        gifts_token,
        info_token,
        pets_token,
        provisions_token,
        residuary_token,
        lastStep,
      } = res_will;

      localStorage.setItem("assetsData", assets_token);
      localStorage.setItem("childrenData", children_token);
      localStorage.setItem("digitalData", digital_token);
      localStorage.setItem("executorData", executor_token);
      localStorage.setItem("giftsData", gifts_token);
      localStorage.setItem("infoData", info_token);
      localStorage.setItem("petsData", pets_token);
      localStorage.setItem("provisionsData", provisions_token);
      localStorage.setItem("residuaryData", residuary_token);
      localStorage.setItem("currentStep", lastStep);
      
    }

    if (res_user?.access_token) {
      localStorage.setItem("authUser", res_user.access_token);
      const userData = jwt(res_user.access_token);
      yield put(loginSuccess(userData));
      const redirectWill = localStorage.getItem('redirectWill')
      if(redirectWill === 'true') {
        history.push("/will");
      } else {
        history.push('/home')
      }
    }

  } catch (error) {
    yield put(apiError(error.response.data));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.clear();
    yield put(AssetsAction.resetContent());
    yield put(ChildrenAction.resetContent());
    yield put(DigitalAction.resetContent());
    yield put(ExecutorAction.resetContent());
    yield put(GiftsAction.resetContent());
    yield put(InfoAction.resetContent());
    yield put(PassdownAction.resetContent());
    yield put(PetsAction.resetContent());
    yield put(ProvisionsAction.resetContent());
    yield put(ResiduaryAction.resetContent());
    history.push("/login");
  } catch (error) {
    yield put(apiError());
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_ADMIN, loginAdmin);
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeEvery(PASSWORD_CHANGE, passwordChange);
}

export default authSaga;
