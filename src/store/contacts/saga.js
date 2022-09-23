import { call, put, takeEvery } from "redux-saga/effects"
import { toast } from "react-toastify"
// Crypto Redux States
import {
  GET_USERS,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getUsers,
  addNewUser,
  updateUser,
  deleteUser,
} from "../../helpers/fakebackend_helper"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response.data))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess(response.data))
    toast.success("Амжиллтай өөрчиллөө", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(updateUserFail(error))
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

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response.data))
    toast.success("Амжиллтай устгаллаа", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(deleteUserFail(error))
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

function* onAddNewUser({ payload: user }) {
  try {
    const response = yield call(addNewUser, user)

    yield put(addUserSuccess(response.data))
  } catch (error) {
    yield put(addUserFail(error))
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

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)

  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default contactsSaga
