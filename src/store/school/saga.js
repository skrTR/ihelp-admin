import { call, put, takeEvery } from "redux-saga/effects"

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
  } catch (error) {
    yield put(updateSchoolFail(error))
  }
}

function* onDeleteSchool({ payload: school }) {
  try {
    const response = yield call(deleteSchool, school)
    yield put(deleteSchoolSuccess(response.data))
  } catch (error) {
    yield put(deleteSchoolFail(error))
  }
}

function* onAddNewSchool({ payload: school }) {
  try {
    const response = yield call(addNewSchool, school)
    yield put(addSchoolSuccess(response.data))
  } catch (error) {
    yield put(addSchoolFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_SCHOOLS, fetchSchools)

  yield takeEvery(ADD_NEW_SCHOOL, onAddNewSchool)
  yield takeEvery(UPDATE_SCHOOL, onUpdateSchool)
  yield takeEvery(DELETE_SCHOOL, onDeleteSchool)
}

export default contactsSaga
