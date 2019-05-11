import axios from 'axios';
import {BaseUrl} from '../constante';

async function getListEmail(domain){
    let Url = BaseUrl + "findervalidEmail"
    

    return axios.post(Url, domain).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response.data.data
      })    
   
}


export const getListEmails = getListEmail;