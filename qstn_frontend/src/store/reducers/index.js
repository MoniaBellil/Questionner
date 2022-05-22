import {combineReducers} from 'redux';
import authReducer from './auth';
import pointsReducer from './points'

export default combineReducers({
  authReducer,
  pointsReducer
})