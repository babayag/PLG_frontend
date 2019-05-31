import { getAllPayments } from '../../../services/Api/historicService';

/***
 * description: get all Historics and dispatch action to refresh the view 
 * params: 
 * return: action dispatch FETCH_Historic
 */
export const fetchHistoric = (email) => {

  return dispatch => {
    return getAllPayments(email, dispatch)
  }
    /* return dispatch => {
      let headers = {"Content-Type": "application/json"};
      return  fetch(BaseUrl + "getAllHistoric", {headers, })
        .then(res => res.json())
        .then(Historics => {
          return dispatch({
            type: 'FETCH_Historic',
            Historics
          })
        })
    } */
  }