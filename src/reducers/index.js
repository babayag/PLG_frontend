import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import forfaits from "./forfait/forfait";
import auth from "./auth";
import numberRequest from './leads/restOfrequest'
import recentSearch from './UserSearch/UserSearch';

const leadApp = combineReducers({
  forfaits,auth,numberRequest,recentSearch
});

export default createStore(leadApp , applyMiddleware(thunk));