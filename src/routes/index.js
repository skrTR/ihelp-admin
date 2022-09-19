import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import users from "pages/Users/users"
import usersVerify from "pages/Users/usersVerify"
import companys from "pages/Companys/companys"
import companysVerify from "pages/Companys/companysVerify"
import CompanyCreate from "pages/Companys/companyCreate"
import schoolsList from "pages/SchoolList/schools-list"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // бүх хэрэглэгчид
  { path: "/users", component: users },
  // Хэрэглэгч баталгаажуулах
  { path: "/users-verify", component: usersVerify },

  // бүх компани
  { path: "/companys", component: companys },
  // компани баталгаажуулах
  { path: "/company-verify", component: companysVerify },
  // компани үүсгэх
  { path: "/company-create", component: CompanyCreate },
  // бүх Сургууль
  { path: "/schools", component: schoolsList },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
