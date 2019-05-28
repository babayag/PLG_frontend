
import axios from 'axios';
import {BaseUrl} from '../constante';

async function findEmail(url,p){
    
    let Url = BaseUrl + "testSharing"


    return axios.post(Url, { url : url, p:p}).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        localStorage.setItem('domain', url);
        return response.data
      })    
   
} 

export const findEmails = findEmail;