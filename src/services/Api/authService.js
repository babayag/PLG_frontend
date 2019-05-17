import axios from 'axios';
import {BaseUrl} from '../constante';

async function signup(email,password){
    
    let Url = BaseUrl + "auth/users/create/"


    return axios.post(Url, { email : email, password:password}).then(response => {
        // returning the data here allows the caller to get it through another .then(...)
        return response
    })
} 

export const register = signup;