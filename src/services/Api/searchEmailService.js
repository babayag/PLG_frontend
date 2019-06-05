
import axios from 'axios';
import {BaseUrl} from '../constante';

/* 
* description : the method get the list of Email 
* params : domain
* return : a json object contain the list of emails an thier sources
*/
async function findEmail(url,p,dispatch){
    
    let Url = BaseUrl + "testSharing";
    dispatch({type: 'FETCH_REFRESHSTATE'})
    dispatch({type: 'EMAIL_IS_LOADING'})
    return axios.post(Url, { url : url, p:p}).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        localStorage.setItem('domain', url);
        return response.data
      })    
   .then((emails) =>{
     
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
   
   return dispatch({
     type:"FETCH_SEEMORE",
     emails
   })
 })
}

// async function searchTheseData(niche, location, p, dispatch){
//   let Url = BaseUrl + "normalFindLeads"

//   dispatch({type: 'LEAD_IS_LOADING'})
//   return axios.post(Url, { niche: niche, city: location, p:p })
//   .then(response => {
//         return response.data
//     })
//     .then(lead =>{
//       console.log(lead)
//         return dispatch({
//           type: 'LEAD_LOADED',
//           data: lead.data.Results
//       })
//     })   
 
//}
export const findEmails = findEmail;
export const findEmailSeeMores = findEmailSeeMore;