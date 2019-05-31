
import axios from 'axios';
import {BaseUrl} from '../constante';

/***
 * description: gets the emails corresponding to the provided niche and location 
 * params: niche, location, p: number of pages   
 * return: list of the emails that were found
 */
async function searchTheseData(niche, location, p){
    let Url = BaseUrl + "normalFindLeads"
    

    return axios.post(Url, { niche: niche, city: location, p:p }).then(response => {
        return response.data
      })    
   
}


  /***
   * description: check facebook and google pixel on the provided domain
   * params: domain 
   * return: an object like {domain: domain, hasFbPixel: boolean, hasGooglePixel: boolean}
   */
async function checkFacebookAndGooglePixel(domain){
  let Url = BaseUrl + "checkpixel";

  return axios.post(Url,domain ).then(response => {      
    return response.data
  })    
 
}


  /***
   * description: gets the emails corresponding to the provided niche and location when the user is connected
   * params: niche, location, email: email of the user, p: number of pages 
   * return: list of the emails that were found
   */
async function BetterFinder(niche, location, email, p){
  let Url = BaseUrl + "betterfindlead"
  

  return axios.post(Url,{ niche: niche, city: location, email : email, p: p } ).then(response => {
      
      return response.data
    })    
 
}


/***
 * description: gets the number of remaining requests of the current user 
 * params: email of the current user
 * return: number of remaining requests
 */
async function getRestOfUserRequest(email,dispatch){
  let Url = BaseUrl + "getRestOfrequest"
  
  console.log('lol --' + email);
  return axios.post(Url, { email: email })
    .then(response => {
      
      return response.data
    })
    .then(numberOfRequest => {
      return dispatch({
        type : 'LOAD_REST_OF_REQUEST',
        numberOfRequest
      })
    });    
 
}



export const searchTheseDatas = searchTheseData;
export const checkFacebookAndGooglePixels = checkFacebookAndGooglePixel;
export const BetterFinders = BetterFinder;
export const getRestOfUserRequests = getRestOfUserRequest