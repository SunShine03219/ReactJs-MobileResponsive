import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import EmailVerifySaga from "./auth/emailVerify/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import passdownSaga from "./will/passdown/saga";
import infoSaga from "./will/info/saga";
import executorSaga from "./will/executor/saga";
import digitalSaga from "./will/digital/saga";
import giftsSaga from "./will/gifts/saga";
import childrenSaga from "./will/children/saga";
import PetsSaga from "./will/pets/saga";
import provisionsSaga from "./will/provisions/saga";
import assetsSaga from "./will/assets/saga";
import residuarySaga from "./will/residuary/saga";
import reviewSaga from "./will/review/saga";
import userSaga from "./admin/users/saga";
import docSaga from "./admin/docs/saga";
import blogSaga from "./blog/saga";
import chatGptSaga from "./will/chat-gpt/saga";

export default function* rootSaga() {
  yield all([
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(EmailVerifySaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(passdownSaga),
    fork(infoSaga),
    fork(executorSaga),
    fork(digitalSaga),
    fork(giftsSaga),
    fork(childrenSaga),
    fork(PetsSaga),
    fork(provisionsSaga),
    fork(assetsSaga),
    fork(residuarySaga),
    fork(reviewSaga),
    fork(userSaga),
    fork(docSaga),
    fork(blogSaga),
    fork(chatGptSaga)
  ]);
}
