import { findEmailSeeMores } from '../../../services/Api/searchEmailService';

export const fetchSeeMore = (url,p) => {

  return dispatch => {
    return findEmailSeeMores(url,p,dispatch);
  }
}