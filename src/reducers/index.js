import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import forfaits from "./forfait/forfait";
import paymentHistoric from './historics/paymentHistoric';
import auth from "./auth";
import numberRequest from './leads/restOfrequest'

const leadApp = combineReducers({
  forfaits,
  auth,
  numberRequest,
  paymentHistoric
})

export default createStore(leadApp , applyMiddleware(thunk));