import {searchTheseDatas} from '../../../services/Api/leadService';
import {BetterFinders} from '../../../services/Api/leadService';
import {checkFacebookAndGooglePixels, hideShowMoreButtons} from '../../../services/Api/leadService';
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

export const checkPixelAction = (domain) => {

    return dispatch => {
      
      return checkFacebookAndGooglePixels(domain, dispatch)
       
    } 
}

export const hideShowMore = () => {

    return dispatch => {
      
      return hideShowMoreButtons(dispatch)
       
    } 
}

export const init = () => {
    return dispatch => {
      
      return initDatas(dispatch)
       
    } 
}