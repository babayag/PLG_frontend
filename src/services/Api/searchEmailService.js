
import axios from 'axios';
import {BaseUrl} from '../constante';

/* 
* description : the method get the list of Email 
* params : url,p,dispatch
* return : a json object contain the list of emails an thier sources
*/
async function findEmail(url,p,dispatch){
    
    let Url = BaseUrl + "testSharing";
    dispatch({type: 'FETCH_REFRESHSTATE'})
    dispatch({type: 'EMAIL_IS_LOADING'})
    // dispatch action "FETCH_REFRESHSTATE" and "EMAIL_IS_LOADING" of reducer "toggleSearchEmail" 
    return axios.post(Url, { url : url, p:p}).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        localStorage.setItem('domain', url);
        return response.data
      })    
   .then((emails) =>{
         // dispatch action "FETCH_EMAILS"  of reducer "toggleSearchEmail" 
     return dispatch({
       type:"FETCH_EMAILS",
       emails
     })
   })
} 

async function findEmailSeeMore(url,p,dispatch){
    
  let Url = BaseUrl + "testSharing";

  dispatch({type: 'EMAIL_IS_LOADING'})
  return axios.post(Url, { url : url, p:p}).then(response => {
      // returning the data here allows the caller to get it through another .then(...)
      localStorage.setItem('domain', url);
      return response.data
    })    
 .then((emails) =>{
            // dispatch action "FETCH_SEEMORE"  of reducer "toggleSearchEmail" 
   return dispatch({
     type:"FETCH_SEEMORE",
     emails
   })
 })
}

export const findEmails = findEmail;
export const findEmailSeeMores = findEmailSeeMore;