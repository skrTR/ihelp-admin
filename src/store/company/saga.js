import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_COMPANYS,
  ADD_NEW_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
} from "./actionTypes"

import {
  getCompanysSuccess,
  getCompanysFail,
  addCompanyFail,
  addCompanySuccess,
  updateCompanySuccess,
  updateCompanyFail,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getCompanys,
  addNewCompany,
  updateCompany,
  deleteCompany,
} from "../../helpers/fakebackend_helper"

function* fetchCompanys() {
  try {
    const response = yield call(getCompanys)
    yield put(getCompanysSuccess(response.data))
  } catch (error) {
    yield put(getCompanysFail(error))
  }
}

function* onUpdateCompany({ payload: company }) {
  try {
    const response = yield call(updateCompany, company)
    yield put(updateCompanySuccess(response.data))
  } catch (error) {
    yield put(updateCompanyFail(error))
  }
}

function* onDeleteCompany({ payload: company }) {
  try {
    const response = yield call(deleteCompany, company)
    yield put(deleteCompanySuccess(response.data))
  } catch (error) {
    yield put(deleteCompanyFail(error))
  }
}

function* onAddNewCompany({ payload: company }) {
  try {
    const response = yield call(addNewCompany, company)

    yield put(addCompanySuccess(response.data))
  } catch (error) {
    yield put(addCompanyFail(error))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_COMPANYS, fetchCompanys)
  yield takeEvery(ADD_NEW_COMPANY, onAddNewCompany)
  yield takeEvery(UPDATE_COMPANY, onUpdateCompany)
  yield takeEvery(DELETE_COMPANY, onDeleteCompany)
}

export default contactsSaga
