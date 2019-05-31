
import axios from 'axios';
import {BaseUrl} from '../constante';

/* 
* description : the method get the list of Email 
* params : domain
* return : a json object contain the list of emails an thier sources
*/
async function findEmail(url,p){
    
    let Url = BaseUrl + "testSharing"


    return axios.post(Url, { url : url, p:p}).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        localStorage.setItem('domain', url);
        return response.data
      })    
   
} 

export const findEmails = findEmail;