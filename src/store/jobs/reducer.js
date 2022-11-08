import {
  GET_JOBS_FAIL,
  GET_JOBS_SUCCESS,
  GET_JOB_DETAIL_FAIL,
  GET_JOB_DETAIL_SUCCESS,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  jobs: [],
  jobDetail: {},
  error: {},
}

const jobs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload,
      }

    case GET_JOBS_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case ADD_JOB_SUCCESS:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      }

    case ADD_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_JOB_DETAIL_SUCCESS:
      return {
        ...state,
        jobDetail: action.payload,
      }

    case UPDATE_JOB_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.map(job =>
          job.id.toString() === action.payload.id.toString()
            ? { job, ...action.payload }
            : job
        ),
      }

    case UPDATE_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_JOB_SUCCESS:
      return {
        ...state,
        jobs: state.jobs.filter(
          job => job.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_JOB_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_JOB_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default jobs
