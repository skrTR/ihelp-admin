import { call, put, takeEvery } from "redux-saga/effects"
import { toast } from "react-toastify"
// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess } from "./actions"

import { postJwtLogin } from "../../../helpers/fakebackend_helper"

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postJwtLogin, {
      phone: user.phone,
      password: user.password,
    })
    localStorage.setItem("authUser", JSON.stringify(response))
    localStorage.setItem("amazon-token", JSON.stringify(response.token))
    yield put(loginSuccess(response))
    history.push("/dashboard")
  } catch (error) {
    // yield put(apiError(error))
    let message = error.response.data.error.message
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    localStorage.removeItem("amazon-token")
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
