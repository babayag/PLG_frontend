
import axios from 'axios';
import {BaseUrl} from '../constante';

async function searchTheseData(niche, location, p){
    let Url = BaseUrl + "normalFindLeads"
    

    return axios.post(Url, { niche: niche, city: location, p:p }).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response.data
      })    
   
}

async function checkFacebookAndGooglePixel(domain){
  let Url = BaseUrl + "checkpixel"
  

  return axios.post(Url,domain ).then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response.data
    })    
 
}

export const searchTheseDatas = searchTheseData;
export const checkFacebookAndGooglePixels = checkFacebookAndGooglePixel;