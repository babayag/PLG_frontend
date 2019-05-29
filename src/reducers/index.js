import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import forfaits from "./forfait/forfait";
import auth from "./auth";
import numberRequest from './leads/restOfrequest'

const leadApp = combineReducers({
  forfaits,auth,numberRequest
})

export default createStore(leadApp , applyMiddleware(thunk));