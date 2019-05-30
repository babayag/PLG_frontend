import axios from 'axios';
import {BaseUrl} from '../constante';

/***
 * description: Gets the list of all the payments the user has ever made
 * params:  email: email of the current user, dispatch   
 * return: The list of all the payments the user has ever made
 */
async function getAllPayment(email, dispatch){
    let Url = BaseUrl + "getAllPayement"
    
  
    return axios.post(Url,{email: email}).then(response => {
        
        return response.data
    })
    .then(payments => {
      return dispatch({
          type: 'FETCH_PAYMENTS_HISTORIC',
          payments
        })
    })  
   
}

/***
 * description: Gets the list of all the searches the user has ever made
 * params:  email: email of the current user   
 * return: The list of all the searches the user has ever made
 */
async function getAllTheSearches(email){
    let Url = BaseUrl + "getallusersearch"
    
  
    return axios.post(Url,{email: email}).then(response => {
        
        return response.data
    })    
   
}
  
export const getAllPayments = getAllPayment;
export const getAllSearches = getAllTheSearches;