import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import forfaits from "./forfait/forfait";
import auth from "./auth";

const leadApp = combineReducers({
  forfaits,auth,
})

export default createStore(leadApp , applyMiddleware(thunk));