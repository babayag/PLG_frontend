
import axios from 'axios';
import {BaseUrl} from '../constante';

async function makePayment( price, email, idForfait ){
  let Url = BaseUrl + "createPayment"
  

  return axios.post(Url, {price: price, email: email, idForfait: idForfait})
  .then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response
    })    
 
}

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