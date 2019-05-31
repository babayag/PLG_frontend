import axios from 'axios';
import {BaseUrl} from '../constante';

/***
 * description: gets the list of all forfaits from the back-end
 * params: void
 * return: list of forfaits
 */

async function getAllforfait(dispatch){
    let Url = BaseUrl + "getAllforfait"
  
    return axios.get(Url)
      .then(response => {
        
        return response.data
      })
      .then(forfaits => {
        return dispatch({
            type: 'FETCH_FORFAIT',
            forfaits
          })
      })    
   
  }
  
  export const getAllforfaits = getAllforfait;