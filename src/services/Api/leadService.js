
import axios from 'axios';
import {BaseUrl} from '../constante';
/***
 * description: gets the emails corresponding to the provided niche and location 
 * params: niche, location, p: number of pages   
 * return: list of the emails that were found
 */


async function searchTheseData(niche, location, p, Action, dispatch){
  let Url = BaseUrl + "normalFindLeads"
console.log(Action)
  
  dispatch({
    type: 'FETCH_LOADING',
    user: 'gest'
  })  
  return axios.post(Url, { niche: niche, city: location, p: p })
  .then(response => {      
      return response.data
    })
    .then(lead =>{

      if(Action[Action.length - 1] === 'FETCH_SHOW_MORE_<_10'){
        console.log('FETCH_INITIALIZE')
        return dispatch({
          type: 'FETCH_INITIALIZE',
          data: lead.data.Results,
          user: 'gest'
        })
      }
      
      if(lead.data.Results.length >= 10){
        return dispatch({
          type: 'FETCH_SHOW_MORE',
          data: lead.data.Results,
          user: 'gest'
        })
      }else{
        return dispatch({
          type: 'FETCH_SHOW_MORE_<_10',
          data: lead.data.Results,
          user: 'gest'
        })
     }
    })
    .catch(err =>{
      return dispatch({
        type: 'FETCH_ERROR',
        error: err,
        user: 'gest'
      })
    })   
}


  /***
   * description: check facebook and google pixel on the provided domain
   * params: domain 
   * return: an object like {domain: domain, hasFbPixel: boolean, hasGooglePixel: boolean}
   */
async function checkFacebookAndGooglePixel(domain){
  let Url = BaseUrl + "checkpixel";

  return axios.post(Url,domain )
    .then(response => {      
      return response.data
    })    
 
}


  /***
   * description: gets the emails corresponding to the provided niche and location when the user is connected
   * params: niche, location, email: email of the user, p: number of pages 
   * return: list of the emails that were found
   */
async function BetterFinder(niche, location, Email, p, dispatch){
  let Url = BaseUrl + "betterfindlead"
  dispatch({type: 'FETCH_LOADING',  user: Email})
  return axios.post(Url,{ niche: niche, city: location, email : Email, p: p })
  .then(response => {
    console.log(response)
        return response.data
    })
    .then(lead =>{
      if (typeof(lead) == "string")
      {
        console.log('FETCH_FORFAIT_FINISHED')
        return dispatch({
          type: 'FETCH_FORFAIT_FINISHED',
          forfaitFinished: lead,
          user: Email
        })
      }
      if(lead.data.Results.length >= 10){
        console.log('FETCH_SHOW_MORE')
        return dispatch({
          type: 'FETCH_SHOW_MORE',
          data: lead.data.Results,
          user: Email
        })
      }else{
        console.log('FETCH_SHOW_MORE_<_10')
        return dispatch({
          type: 'FETCH_SHOW_MORE_<_10',
          data: lead.data.Results,
          user: Email
        })
     }
    })
    .catch(err =>{
      console.log('FETCH_ERROR')
      return dispatch({
        type: 'FETCH_ERROR',
        error: err,
        user: Email
      })
    })  
 
}


/***
 * description: gets the number of remaining requests of the current user 
 * params: email of the current user
 * return: number of remaining requests
 */
async function getRestOfUserRequest(email,dispatch){
  let Url = BaseUrl + "getRestOfrequest"
  
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