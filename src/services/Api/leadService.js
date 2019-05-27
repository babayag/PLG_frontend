
import axios from 'axios';
import {BaseUrl} from '../constante';

/* 
* description : the method search emails according to a particular niche and location  
* params : niche, location, p
* return : a json object contain the list of domain and emails found on it
*/
async function searchTheseData(niche, location, p){
    let Url = BaseUrl + "normalFindLeads"
    

    return axios.post(Url, { niche: niche, city: location, p:p }).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response.data
      })    
   
}

/* 
* description : the method check if we have pixel or google analytics on a website   
* params : domain
* return : a json object contain two attributes (hasFacebookPixel , hasGooglePixel) wich has true or false value
*/
async function checkFacebookAndGooglePixel(domain){
  let Url = BaseUrl + "checkpixel"
  

  return axios.post(Url,domain ).then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response.data
    })    
 
}

/* 
* description : the method search emails according to a particular niche and location  
* params : niche, location, p, email 
* return : a json object contain the list of domain and emails found on it for a connect user 
*/

async function BetterFinder(niche, location, email, p){
  let Url = BaseUrl + "betterfindlead"
  

  return axios.post(Url,{ niche: niche, city: location, email : email, p: p } ).then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      
      return response.data
    })    
 
}

/* 
* description : the method search emails according to a particular niche and location  
* params : email 
* return : a json object contain the rest of his request for a connect user 
*/
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