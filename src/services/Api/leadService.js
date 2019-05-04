
import axios from 'axios';
import {BaseUrl} from '../constante';

async function searchTheseData(niche, location, p){
    
    let Url = BaseUrl + "normalFindLeads"
    

    return axios.post(Url, { niche: niche, city: location, p:0 }).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        // localStorage.setItem('domain', url);
        return response.data
      })    
   
} 

export const searchTheseDatas = searchTheseData;