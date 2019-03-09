import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import notes from "./testIt";
import auth from "./auth";

const leadApp = combineReducers({
  notes,auth,
})

export default createStore(leadApp , applyMiddleware(thunk));