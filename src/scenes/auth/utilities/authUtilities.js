let emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]+$/;
let passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}/;

/* 
* description : the method check if a field is empty
* params : field
* return : a String object message 
*/
export const checkIfEmpty = (field) => {
    let returnMsg = "";
    if(field == ""){
        returnMsg = "This field must not be empty";
    }

    return returnMsg;
}

/* 
* description : the method check if a field is a valid email value
* params : email
* return : a String object message 
*/

export const checkEmailValidation = (email) => {
    let returnMsg = "";
    if(email != ""){
        if(!emailRegex.test(email)){
            returnMsg = "Please enter a correct email address";
        }
    }else{
        returnMsg = "This field must not be empty"
    }
    
    return returnMsg;
}

/* 
* description : the method check if the password is secure enough
* params : field
* return : a String object message 
*/
export const checkPasswordValidation = (password) => {
    let returnMsg = "";

    if(password != ""){
        if(!passwordRegex.test(password)){
            returnMsg = "Your password should be at least 8 characters long, have at least one capital letter, one lowercase letter and one digit"
        }
    }
    else{
        returnMsg = "This field must not be empty";
    }

    return returnMsg;
}