
import {getAllSearches} from '../../../services/Api/historicService';


export const recentSearchLoading = (email) => {
  
    return dispatch => {
      
      return getAllSearches(email, dispatch)
       
    }
    
  }