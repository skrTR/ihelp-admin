import {
  GET_COMPANYS,
  GET_COMPANYS_FAIL,
  GET_COMPANYS_SUCCESS,
  ADD_NEW_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAIL,
  UPDATE_COMPANY,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  DELETE_COMPANY,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
} from "./actionTypes"

export const getCompanys = () => ({
  type: GET_COMPANYS,
})

export const getCompanysSuccess = companys => ({
  type: GET_COMPANYS_SUCCESS,
  payload: companys,
})

export const addNewCompany = company => ({
  type: ADD_NEW_COMPANY,
  payload: company,
})

export const addCompanySuccess = company => ({
  type: ADD_COMPANY_SUCCESS,
  payload: company,
})

export const addCompanyFail = error => ({
  type: ADD_COMPANY_FAIL,
  payload: error,
})

export const getCompanysFail = error => ({
  type: GET_COMPANYS_FAIL,
  payload: error,
})

export const updateCompany = company => ({
  type: UPDATE_COMPANY,
  payload: company,
})

export const updateCompanySuccess = company => ({
  type: UPDATE_COMPANY_SUCCESS,
  payload: company,
})

export const updateCompanyFail = error => ({
  type: UPDATE_COMPANY_FAIL,
  payload: error,
})

export const deleteCompany = company => ({
  type: DELETE_COMPANY,
  payload: company,
})

export const deleteCompanySuccess = company => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: company,
})

export const deleteCompanyFail = error => ({
  type: DELETE_COMPANY_FAIL,
  payload: error,
})
