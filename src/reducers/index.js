import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import toggleSearchEmail from "./searchemail/searchEmailReducer";
import auth from "./auth";

const leadApp = combineReducers({
  auth,toggleSearchEmail
})

export default createStore(leadApp , applyMiddleware(thunk));