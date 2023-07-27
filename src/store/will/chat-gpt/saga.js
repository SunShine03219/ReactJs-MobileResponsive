import { call, put, takeEvery } from "redux-saga/effects";
import API from "../../../helper/api";
import {
  GET_FIRST_QUESTION,
  GPT_SEND_DATA,
  GET_CURRENT_QA,
  SWITCH_GO_FOME
} from "./actionTypes";
import { getFirstQuestionSuccess, sendDataSuccess, getCurrentQuestionSuccess, setChat } from "./actions";
import { currentStepAction, ExecutorAction, InfoAction, DigitalAction, GiftsAction, ChildrenAction, PetsAction, ProvisionsAction, ResiduaryAction, AssetsAction } from "../../actions";
import jwtDecode from "jwt-decode";

function* getFirstQuestion() {
  try {
    const response = yield call(API.get, `/will/chat-gpt/first`);
    if (response.data) {
      localStorage.setItem("currentStep", response.data.currentStep);
      yield put(getFirstQuestionSuccess(response.data));
    }
  } catch (error) {
    console.log(error)
  }
}

function* sendData({ payload: data }) {
  try {
    const response = yield call(API.post, `/will/chat-gpt`, data);
    if (response.data.success) {
      localStorage.setItem("currentStep", response.data.currentStep);
      if (response.data.field === 'fullName') {
        localStorage.setItem('currentEamil', response.data.currentEmail)
      }
      yield put(currentStepAction.setCurrentStep(response.data.currentStep))
      yield put(sendDataSuccess(response.data));
    } else {
      yield put(sendDataSuccess(response.data));
    }

  } catch (error) {
    console.log(error)
  }
}

function* getCurrentQA({ payload: data }) {
  try {
    const response = yield call(API.post, `/will/chat-gpt/current`, data);
    let initailArray = [];
    if (response.data) {
      localStorage.setItem("currentStep", response.data.currentStep);
      yield put(currentStepAction.setCurrentStep(response.data.currentStep + 1))

      initailArray.push(response.data)
      yield put(getCurrentQuestionSuccess(initailArray));
    }
  } catch (error) {
    console.log(error)
  }
}

function* switchGoHome({ payload: email }) {
  try {
    const response = yield call(API.post, `/will/chat-gpt/switch-form`, { email: email });
    console.log('response =>', response)
    yield put(setChat(false))
    const res_will = response.data.will
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
      } = res_will;

      localStorage.setItem("assetsData", assets_token);
      yield put(AssetsAction.fetchContent(jwtDecode(assets_token)))

      localStorage.setItem("childrenData", children_token);
      yield put(ChildrenAction.fetchContent(jwtDecode(children_token)))

      localStorage.setItem("digitalData", digital_token);
      yield put(DigitalAction.fetchContent(jwtDecode(digital_token)))

      localStorage.setItem("executorData", executor_token);
      yield put(ExecutorAction.fetchContent(jwtDecode(executor_token)))

      localStorage.setItem("giftsData", gifts_token);
      yield put(GiftsAction.fetchContent(jwtDecode(gifts_token)))


      localStorage.setItem("infoData", info_token);
      yield put(InfoAction.fetchContent(jwtDecode(info_token)))


      localStorage.setItem("petsData", pets_token);
      yield put(PetsAction.fetchContent(jwtDecode(pets_token)))

      localStorage.setItem("provisionsData", provisions_token);
      yield put(ProvisionsAction.fetchContent(jwtDecode(provisions_token)))

      localStorage.setItem("residuaryData", residuary_token);
      yield put(ResiduaryAction.fetchContent(jwtDecode(residuary_token)))

    } else {
      yield put(setChat(false))
    }
  } catch (error) {
    console.log('error =>', error)
  }
}


function* chatGptSaga() {
  yield takeEvery(GET_FIRST_QUESTION, getFirstQuestion);
  yield takeEvery(GPT_SEND_DATA, sendData);
  yield takeEvery(GET_CURRENT_QA, getCurrentQA);
  yield takeEvery(SWITCH_GO_FOME, switchGoHome);

}

export default chatGptSaga;
