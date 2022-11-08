import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// get Хэрэглэгч
export const getUsers = () => get(url.GET_USERS)
// add Хэрэглэгч
export const addNewUser = user => post(url.ADD_NEW_USER, user)
// update Хэрэглэгч
export const updateUser = user => put(`${url.UPDATE_USER}/${user.id}`, user)
// delete Хэрэглэгч
export const deleteUser = user => del(`${url.DELETE_USER}/${user._id}`)

// get компани
export const getCompanys = () => get(url.GET_COMPANYS)
// add компани
export const addNewCompany = company => post(url.ADD_NEW_COMPANY, company)
// update компани
export const updateCompany = company =>
  put(`${url.UPDATE_COMPANY}/${company.id}`, company)
// delete компани
export const deleteCompany = company =>
  del(`${url.DELETE_COMPANY}/${company._id}`)

// get компани
export const getSchools = () => get(url.GET_SCHOOLS)
// add компани
export const addNewSchool = school => post(url.ADD_NEW_SCHOOL, school)
// update компани
export const updateSchool = school =>
  put(`${url.UPDATE_SCHOOL}/${school.id}`, school)
// delete компани
export const deleteSchool = school => del(`${url.DELETE_SCHOOL}/${school._id}`)
//
// get ажил
export const getJobs = () => get(url.GET_JOBS)
// add ажил
export const addNewJob = job => post(url.ADD_NEW_JOB, job)
// update ажил
export const updateJob = job => put(`${url.UPDATE_JOB}/${job.id}`, job)
// delete ажил
export const deleteJob = job => del(`${url.DELETE_JOB}/${job._id}`)
// get project details
export const getJobsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

export { getLoggedInUser, isUserAuthenticated, postJwtLogin }
