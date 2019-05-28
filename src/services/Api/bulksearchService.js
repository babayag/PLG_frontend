import axios from 'axios';
import {BaseUrl} from '../constante';


/***
         * description: gets the list of all emails and domains from the back-end
         * params: a domain
         * return: list of all email and domains matching with the current list of entring domain
         */
  
async function getListEmail(domain){
    let Url = BaseUrl + "bulksearch"

    return axios.post(Url, domain).then(response => {
        
        return response.data.data
      })    
   
}


export const getListEmails = getListEmail;