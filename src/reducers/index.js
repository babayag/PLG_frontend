import { combineReducers, createStore } from 'redux';
import notes from "./testIt";

const leadApp = combineReducers({
  notes
})

export default createStore(leadApp);