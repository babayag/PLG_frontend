import {BaseUrl} from '../../../services/constante';
import { getAllforfaits } from '../../../services/Api/forfaitService';
import { dispatch } from 'rxjs/internal/observable/range';

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