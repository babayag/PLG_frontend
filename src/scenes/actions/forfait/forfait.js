import { getAllforfaits } from '../../../services/Api/forfaitService';

/***
 * description: get all forfaits and dispatch action to refresh the view 
 * params: 
 * return: action dispatch FETCH_FORFAIT
 */
export const fetchForfait = () => {

  return dispatch => {
    return getAllforfaits(dispatch)
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