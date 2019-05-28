import axios from 'axios';
import {BaseUrl} from '../constante';

async function getDomain(domain){
    let Url = BaseUrl + "downloadEmails"
    
    /***
         * description: gets the list of all emails and domains from the back-end
         * params: a domain
         * return: list of all email and domains matching with the current entring domain
         */
  
    return axios.post(Url, {url: domain}).then(response => {
        
        return response.data
      })    
   
  }
  
  export const getDomains = getDomain;