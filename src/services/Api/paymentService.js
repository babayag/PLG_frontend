
import axios from 'axios';
import {BaseUrl} from '../constante';

/***
 * description: create a payment that will be executed
 * params: price: price of the payment, email: email of the current user, 
 *          idForfait: Identifier of the forfait the user wants to pay   
 * return: the url that the user will be redirected to
 */
async function makePayment( price, email, idForfait ){
  let Url = BaseUrl + "createPayment"
  

  return axios.post(Url, {price: price, email: email, idForfait: idForfait})
  .then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response
    })    
 
}

/***
 * description: execute a payment that has been created
 * params: data: {...parsed this is the value of parsed => [ const parsed = queryString.parse(window.location.search) ], email: current user email, 
 *          idForfait:Identifier of the forfait the user wants to pay}   
 * return: the response sent from the server with the status code
 */
async function executePayment(data){
  let Url = BaseUrl + "executePayment"
  

  return axios.post(Url, data)
  .then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response
    })    
 
}
export const makePayments = makePayment;
export const executePayments = executePayment;