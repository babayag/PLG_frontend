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
        console.log(response.data)
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
async function getAllTheSearches(email, dispatch){
    let Url = BaseUrl + "getallusersearch";
    dispatch({type: 'RECENT_SEARCH_LOADING'})
    return axios.post(Url,{email: email})
    .then(response => {
        return response.data
    }).then(search =>{
        return dispatch({
            type: 'RECENT_SEARCH_LOADED',
            searchList: search
        })
    }).catch(err =>{
        return dispatch({
            type: 'RECENT_SEARCH_ERROR',
            error: err
        })
    }) 
   
}
  
export const getAllPayments = getAllPayment;
export const getAllSearches = getAllTheSearches;