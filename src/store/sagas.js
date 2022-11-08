import { all, fork } from "redux-saga/effects"

//public
import contactsSaga from "./contacts/saga"
import companysSaga from "./company/saga"
import schoolsSaga from "./school/saga"
import jobsSaga from "./jobs/saga"
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AuthSaga),
    fork(LayoutSaga),
    fork(contactsSaga),
    fork(companysSaga),
    fork(schoolsSaga),
    fork(jobsSaga),
  ])
}
