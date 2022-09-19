import {
  GET_SCHOOLS_SUCCESS,
  GET_SCHOOLS_FAIL,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_FAIL,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_FAIL,
  DELETE_SCHOOL_SUCCESS,
  DELETE_SCHOOL_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  schools: [],
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SCHOOLS_SUCCESS:
      return {
        ...state,
        schools: action.payload,
      }

    case GET_SCHOOLS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_SCHOOL_SUCCESS:
      return {
        ...state,
        schools: [...state.schools, action.payload],
      }

    case ADD_SCHOOL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_SCHOOL_SUCCESS:
      return {
        ...state,
        schools: state.schools.map(school =>
          school.id.toString() === action.payload.id.toString()
            ? { school, ...action.payload }
            : school
        ),
      }

    case UPDATE_SCHOOL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_SCHOOL_SUCCESS:
      return {
        ...state,
        schools: state.schools.filter(
          school => school.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_SCHOOL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
