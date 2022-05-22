import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAILD,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_COMPLETED,
  USER_LOADED,
  LOGOUT,
  CLEAR_ERRORS,
  POINTS_LOADED,
} from "../actions/auth/types";
import Cookies from 'js-cookie';
// initial state of the auth store
let initialState = {
  token: Cookies.get("token"),
  isAuthenticated: false,
  loading: false,
  role: null,
  isRegistred: false,
  message: null,
  user: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADED:
      localStorage.setItem("id",payload._id);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
        
      };
      case POINTS_LOADED:
    localStorage.setItem("points",payload);
      return {
        ...state,
      };
    case REGISTER_PENDING:
      return { ...state, loading: true, message: null, isRegistred: false };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isRegistred: true,
        message: payload,
      };
    case REGISTER_COMPLETED:
      return {
        ...state,
        loading: false,
        isRegistred: false,
        message: null,
      };
    case REGISTER_FAILD:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: null,
        message: payload,
      };
    case LOGIN_PENDING:
      return { ...state, loading: true, message: null, isAuthenticated: false };
    case LOGIN_SUCCESS:
      Cookies.set("token", payload.token);

      return {
        ...state,
        role: payload.role,
        loading: false,
        isRegistred:true,
        isAuthenticated: true,
        message: payload.message,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: null,
        message: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        message: null,
      };
    case LOGOUT:
      Cookies.remove("token");
      localStorage.removeItem('id');
      localStorage.removeItem("points");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: null,
        message: null,
      };
    default:
      return state;
  }
};

export default authReducer;
