import { call, put, takeEvery } from "redux-saga/effects"

import { toast } from "react-toastify"
// Crypto Redux States
import {
  GET_SCHOOLS,
  ADD_NEW_SCHOOL,
  DELETE_SCHOOL,
  UPDATE_SCHOOL,
} from "./actionTypes"

import {
  getSchoolsSuccess,
  getSchoolsFail,
  addSchoolFail,
  addSchoolSuccess,
  updateSchoolSuccess,
  updateSchoolFail,
  deleteSchoolSuccess,
  deleteSchoolFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getSchools,
  addNewSchool,
  updateSchool,
  deleteSchool,
} from "../../helpers/fakebackend_helper"

function* fetchSchools() {
  try {
    const response = yield call(getSchools)
    yield put(getSchoolsSuccess(response.data))
  } catch (error) {
    yield put(getSchoolsFail(error))
  }
}

function* onUpdateSchool({ payload: school }) {
  try {
    const response = yield call(updateSchool, school)
    yield put(updateSchoolSuccess(response.data))
    toast.success("Амжиллтай өөрчиллөө", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(updateSchoolFail(error))
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

function* onDeleteSchool({ payload: school }) {
  try {
    const response = yield call(deleteSchool, school)
    yield put(deleteSchoolSuccess(response.data))
    toast.success("Амжиллтай устгалаа", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(deleteSchoolFail(error))
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

function* onAddNewSchool({ payload: school }) {
  try {
    const response = yield call(addNewSchool, school)
    yield put(addSchoolSuccess(response.data))
    toast.success("Амжиллтай нэмлээ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  } catch (error) {
    yield put(addSchoolFail(error))
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
  yield takeEvery(GET_SCHOOLS, fetchSchools)

  yield takeEvery(ADD_NEW_SCHOOL, onAddNewSchool)
  yield takeEvery(UPDATE_SCHOOL, onUpdateSchool)
  yield takeEvery(DELETE_SCHOOL, onDeleteSchool)
}

export default contactsSaga
