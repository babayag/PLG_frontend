let emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]+$/;
let passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}/;

export const checkIfEmpty = (field) => {
    let returnMsg = "";
    if(field == ""){
        returnMsg = "This field must not be empty";
    }

    return returnMsg;
}

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