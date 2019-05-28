import axios from 'axios';
import {BaseUrl} from '../constante';

/***
 * description: gets the list of all forfaits from the back-end
 * params: void
 * return: list of forfaits
 */

async function getAllforfait(){
    let Url = BaseUrl + "getAllforfait"
  
    return axios.post(Url).then(response => {
        
        return response.data
      })    
   
  }
  
  export const getAllforfaits = getAllforfait;