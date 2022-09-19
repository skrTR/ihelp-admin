import {
  GET_SCHOOLS,
  GET_SCHOOLS_FAIL,
  GET_SCHOOLS_SUCCESS,
  ADD_NEW_SCHOOL,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_FAIL,
  UPDATE_SCHOOL,
  UPDATE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_FAIL,
  DELETE_SCHOOL,
  DELETE_SCHOOL_SUCCESS,
  DELETE_SCHOOL_FAIL,
} from "./actionTypes"

export const getSchools = () => ({
  type: GET_SCHOOLS,
})

export const getSchoolsSuccess = schools => ({
  type: GET_SCHOOLS_SUCCESS,
  payload: schools,
})

export const addNewSchool = school => ({
  type: ADD_NEW_SCHOOL,
  payload: school,
})

export const addSchoolSuccess = school => ({
  type: ADD_SCHOOL_SUCCESS,
  payload: school,
})

export const addSchoolFail = error => ({
  type: ADD_SCHOOL_FAIL,
  payload: error,
})

export const getSchoolsFail = error => ({
  type: GET_SCHOOLS_FAIL,
  payload: error,
})

export const updateSchool = school => ({
  type: UPDATE_SCHOOL,
  payload: school,
})

export const updateSchoolSuccess = school => ({
  type: UPDATE_SCHOOL_SUCCESS,
  payload: school,
})

export const updateSchoolFail = error => ({
  type: UPDATE_SCHOOL_FAIL,
  payload: error,
})

export const deleteSchool = school => ({
  type: DELETE_SCHOOL,
  payload: school,
})

export const deleteSchoolSuccess = school => ({
  type: DELETE_SCHOOL_SUCCESS,
  payload: school,
})

export const deleteSchoolFail = error => ({
  type: DELETE_SCHOOL_FAIL,
  payload: error,
})
