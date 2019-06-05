import { findEmails } from '../../../services/Api/searchEmailService';

export const fetchSearchEmail = (url,p) => {

  return dispatch => {
    return findEmails(url,p,dispatch)
   
  }
    
  }