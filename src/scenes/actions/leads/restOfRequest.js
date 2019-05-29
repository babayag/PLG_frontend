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
    /* return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return  fetch(BaseUrl + "getAllforfait", {headers, })
        .then(res => res.json())
        .then(forfaits => {
          return dispatch({
            type: 'FETCH_FORFAIT',
            forfaits
          })
        })
    } */
  }