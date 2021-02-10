import {combineReducers} from 'redux';
import authReducer from './authReducer';
export default combineReducers({
   auth:authReducer 
}); //the keys are the state that appears in the app