import {searchTheseDatas} from '../../../services/Api/leadService';
import {BetterFinders} from '../../../services/Api/leadService';


export const searchLeadAction = (niche, location, p, Action) => {
  
    return dispatch => {
      
      return searchTheseDatas(niche, location, p, Action, dispatch)
       
    }
}

export const searchLeadActionConnect = (niche, location, email, p) => {
  console.log(p)
    return dispatch => {
      
      return BetterFinders(niche, location, email, p, dispatch)
       
    } 
}