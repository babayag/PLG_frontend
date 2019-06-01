import { combineReducers, createStore } from 'redux';
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

import forfaits from "./forfait/forfait";
import paymentHistoric from './historics/paymentHistoric';
import auth from "./auth";
import numberRequest from './leads/restOfrequest'
import recentSearch from './UserSearch/UserSearch';
import leadSearch from './lead/lead';

const leadApp = combineReducers({
   auth, recentSearch, leadSearch,
})

export default createStore(leadApp , applyMiddleware(thunk));