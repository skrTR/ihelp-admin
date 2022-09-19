//LOGIN
export const POST_FAKE_JWT_LOGIN = "/cvs/login"

//Бүх хэрэглэгч
export const GET_USERS = "/cvs?limit=1000&organization=false"
export const ADD_NEW_USER = "/cvs"
export const UPDATE_USER = "/cvs"
export const DELETE_USER = "/cvs"
//Бүх хэрэглэгч end

//Бүх компани
export const GET_COMPANYS = "/cvs?limit=1000&organization=true"
export const ADD_NEW_COMPANY = "/cvs"
export const UPDATE_COMPANY = "/cvs"
export const DELETE_COMPANY = "/cvs"
//Бүх компани end

//Бүх сургууль
export const GET_SCHOOLS = "/schools?limit=1000"
export const ADD_NEW_SCHOOL = "/schools"
export const UPDATE_SCHOOL = "/schools"
export const DELETE_SCHOOL = "/schools"
//Бүх сургууль end
