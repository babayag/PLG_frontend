import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import notes from "./testIt";
import auth from "./auth";
import recentSearch from './UserSearch/UserSearch';

const leadApp = combineReducers({
  notes, auth, recentSearch
})

export default createStore(leadApp , applyMiddleware(thunk));