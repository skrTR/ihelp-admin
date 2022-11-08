import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_JOBS,
  GET_JOB_DETAIL,
  ADD_NEW_JOB,
  DELETE_JOB,
  UPDATE_JOB,
} from "./actionTypes"
import {
  getJobsSuccess,
  getJobsFail,
  getJobDetailSuccess,
  getJobDetailFail,
  addJobFail,
  addJobSuccess,
  updateJobSuccess,
  updateJobFail,
  deleteJobSuccess,
  deleteJobFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getJobs,
  getJobsDetails,
  addNewJob,
  updateJob,
  deleteJob,
} from "helpers/fakebackend_helper"

function* fetchJobs() {
  try {
    const response = yield call(getJobs)
    yield put(getJobsSuccess(response))
  } catch (error) {
    yield put(getJobsFail(error))
  }
}

function* fetchJobDetail({ jobId }) {
  try {
    const response = yield call(getJobsDetails, jobId)
    yield put(getJobDetailSuccess(response))
  } catch (error) {
    yield put(getJobDetailFail(error))
  }
}

function* onUpdateJob({ payload: job }) {
  try {
    const response = yield call(updateJob, job)
    yield put(updateJobSuccess(response))
  } catch (error) {
    yield put(updateJobFail(error))
  }
}

function* onDeleteJob({ payload: job }) {
  try {
    const response = yield call(deleteJob, job)
    yield put(deleteJobSuccess(response))
  } catch (error) {
    yield put(deleteJobFail(error))
  }
}

function* onAddNewJob({ payload: job }) {
  try {
    const response = yield call(addNewJob, job)
    yield put(addJobSuccess(response))
  } catch (error) {
    yield put(addJobFail(error))
  }
}

function* jobsSaga() {
  yield takeEvery(GET_JOBS, fetchJobs)
  yield takeEvery(GET_JOB_DETAIL, fetchJobDetail)
  yield takeEvery(ADD_NEW_JOB, onAddNewJob)
  yield takeEvery(UPDATE_JOB, onUpdateJob)
  yield takeEvery(DELETE_JOB, onDeleteJob)
}

export default jobsSaga
