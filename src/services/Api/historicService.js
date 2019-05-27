import axios from 'axios';
import {BaseUrl} from '../constante';

async function getAllPayment(email){
    let Url = BaseUrl + "getAllPayement"
    
  
    return axios.post(Url,{email: email}).then(response => {
        
        return response.data
    })    
   
}
  
async function getAllTheSearches(email){
    let Url = BaseUrl + "getallusersearch"
    
  
    return axios.post(Url,{email: email}).then(response => {
        
        return response.data
    })    
   
}
  
export const getAllPayments = getAllPayment;
export const getAllSearches = getAllTheSearches;