import {searchTheseDatas} from '../../../services/Api/leadService';
import {BetterFinders} from '../../../services/Api/leadService';
import {initDatas} from '../../../services/Api/leadService';


export const searchLeadAction = (niche, location, p) => {
  
    return dispatch => {
      
      return searchTheseDatas(niche, location, p, dispatch)
       
    }
}

export const searchLeadActionConnect = (niche, location, email, p) => {
  console.log(p)
    return dispatch => {
      
      return BetterFinders(niche, location, email, p, dispatch)
       
    } 
}

export const init = () => {
    return dispatch => {
      
      return initDatas(dispatch)
       
    } 
}