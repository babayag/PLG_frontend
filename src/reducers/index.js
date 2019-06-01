import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import notes from "./testIt";
import auth from "./auth";
import recentSearch from './UserSearch/UserSearch';
import leadSearch from './lead/lead';

const leadApp = combineReducers({
  notes, auth, recentSearch, leadSearch,
})

export default createStore(leadApp , applyMiddleware(thunk));