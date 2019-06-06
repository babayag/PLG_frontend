import { findEmails } from '../../../services/Api/searchEmailService';


/* 
* description : the method get the domain url and param p
* params : url,p
* return : a service "findEmails" with two params of function "fetchSearchEmail"
*/

export const fetchSearchEmail = (url,p) => {

  return dispatch => {
    return findEmails(url,p,dispatch)
   
  }
    
  }

