
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

async function BetterFinder(niche, location, email, p){
  let Url = BaseUrl + "betterfindlead"
  

  return axios.post(Url,{ niche: niche, city: location, email : email, p: p } ).then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response.data
    })    
 
}

async function GetRestOfUserRequest( email ){
  let Url = BaseUrl + "getRestOfrequest"
  

  return axios.post(Url, { email: email }).then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response.data
    })    
 
}

export const searchTheseDatas = searchTheseData;
export const checkFacebookAndGooglePixels = checkFacebookAndGooglePixel;
export const BetterFinders = BetterFinder;
export const GetRestOfUserRequests = GetRestOfUserRequest