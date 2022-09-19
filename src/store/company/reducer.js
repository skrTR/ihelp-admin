import {
  GET_COMPANYS_SUCCESS,
  GET_COMPANYS_FAIL,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  companys: [],
  error: {},
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANYS_SUCCESS:
      return {
        ...state,
        companys: action.payload,
      }

    case GET_COMPANYS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        companys: [...state.companys, action.payload],
      }

    case ADD_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        companys: state.companys.map(company =>
          company.id.toString() === action.payload.id.toString()
            ? { company, ...action.payload }
            : company
        ),
      }

    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_COMPANY_SUCCESS:
      return {
        ...state,
        companys: state.companys.filter(
          company => company.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_COMPANY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default contacts
