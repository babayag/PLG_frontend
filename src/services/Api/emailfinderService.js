import axios from 'axios';
import {BaseUrl} from '../constante';

/* 
* description : the method guess the valid email by combination   
* params : domain
* return : a json object contain the list of valid emails
*/
async function searchTheseData(domain){
    let Url = BaseUrl + "findervalidEmail"
    

    return axios.post(Url, domain).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response.data
      })    
   
}


export const searchTheseDatas = searchTheseData;