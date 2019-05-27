import axios from 'axios';
import {BaseUrl} from '../constante';

async function getDomain(domain){
    let Url = BaseUrl + "downloadEmails"
    
  
    return axios.post(Url, {url: domain}).then(response => {
        
        return response.data
      })    
   
  }
  
  export const getDomains = getDomain;