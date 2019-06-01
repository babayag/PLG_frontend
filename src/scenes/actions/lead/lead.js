import {searchTheseDatas} from '../../../services/Api/leadService';


export const searchLeadAction = (niche, location, p) => {
  
    return dispatch => {
      
      return searchTheseDatas(niche, location, p, dispatch)
       
    }
    
}