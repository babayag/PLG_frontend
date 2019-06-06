import { getRestOfUserRequests } from '../../../services/Api/leadService';

/***
 * description: get all forfaits and dispatch action to refresh the view 
 * params: 
 * return: action dispatch FETCH_FORFAIT
 */
export const loadNumberOfrequest = (email) => {

  return dispatch => {
    
    return getRestOfUserRequests(email,dispatch)
  }

  }