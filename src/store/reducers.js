import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"

//хэрэглэгчид
import contacts from "./contacts/reducer"

// Компани
import companys from "./company/reducer"

// Сургууль
import schools from "./school/reducer"
// jobs
import jobs from "./jobs/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  contacts,
  companys,
  schools,
  jobs,
})

export default rootReducer
