import React, { Component } from 'react';
// import { GoogleAuth } from "./googleAuth";
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import logo from '../plg_logo.png';

let emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]+/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}$/;
export class SignupPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            emailValidationMessage:"",
            passwordValidationMessage: "",
            password2ValidationMessage: "",
            allowOnchange: false,   //this is to display the error messages when the user tries to register but with incorrect inputs 
            formCanBeSent: false //becomes true when all the conditions are verified
        }
         /*Without these, notification won't work */
         this.addNotification = this.addNotification.bind(this);
         this.notificationDOMRef = React.createRef();
    }

    handleEmailInputChange = e => { 
        this.setState({
            [e.target.name]: e.target.value
        });

        /*focus on the keyboard changes only when the user has tried to register at least once*/
        if(this.state.allowOnchange){  
            if(!emailRegex.test(this.state.email)){
                this.setState({
                    emailValidationMessage: "Invalid Email"
                })
            }
            else{
                this.setState({
                    emailValidationMessage: ""
                })
            }
        }
    };

    handlePasswordInputChange = e => { 
        this.setState({
            [e.target.name]: e.target.value
        });

        /*focus on the keyboard changes only when the user has tried to register at least once*/
        if(this.state.allowOnchange){  
            if(!passwordRegex.test(this.state.password)){ 
                this.setState({
                    passwordValidationMessage: "Your password should be at least 8 characters long, have at least one capital letter, one lowercase letter and one digit"
                })
            }
            else{
                this.setState({
                    passwordValidationMessage: ""
                })
            }
        }
    };

    handlePassword2InputChange = e => { 
        this.setState({
            [e.target.name]: e.target.value
        });

        /*focus on the keyboard changes only when the user has tried to register at least once*/
        if(this.state.allowOnchange){  
            if(!passwordRegex.test(this.state.password2)){ 
                this.setState({
                    password2ValidationMessage: "Your password should be at least 8 characters long, have at least one capital letter, one lowercase letter and one digit"
                })
            }
            else{
                this.setState({
                    password2ValidationMessage: ""
                })
            }
        }
    };

    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if(e.keyCode === 13){ 
            this.register();
        }

    }

    async register(){
        this.setState({  //now the validation will directly be know everytime the user changes a field, see onchanges functions above
            allowOnchange: true  
        })
        if(!emailRegex.test(this.state.email) && this.state.email != ""){
            this.setState({
                emailValidationMessage: "Please enter a correct email address"
            })
        }
        if(this.state.email == ""){
            this.setState({
                emailValidationMessage: "This field must not be empty"
            })
        }
        if(this.state.password == ""){
            this.setState({
                passwordValidationMessage: "This field must not be empty"
            })
        }
        if(this.state.password2 == ""){
            this.setState({
                password2ValidationMessage: "This field must not be empty"
            })
        }
        if(this.state.password != this.state.password2){
            this.addNotification("Passwords do not match")
        }
        if(this.state.password == this.state.password2 && //if passwords match
            passwordRegex.test(this.state.password) &&   // and if passwords are corect
            emailRegex.test(this.state.email)            // and if email is correct
            ){
                /*We can freely send the request */

                /*ERIC PLEASE CHANGE THE ROUTE */
            const devUrl = 'http://leadmehome.io/api/lead/';
            const devUrlLocal = 'http://127.0.0.1:8000/api/lead/';
            try {
                const res = await axios.post(devUrl, { email : this.state.email, password:this.state.password}) //await fetch(devUrl);
            }
            catch(e){
                console.log(e)
            }

        }
        
    }

    addNotification(message) {
        this.notificationDOMRef.current.addNotification({
            title: "Error",
            message: message,
            type: "awesome",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }


    render() {
      return (
         <div class="signUpDiv text-center">
            <div class="navbar-brand">
                <a class="logoUrl" href="/">
                    <img src={logo} alt="Homepage"/>
                </a>
            </div>

            <div class="inputsBlockParent">
                <div class="inputsBlock col-lg-6 col-md-8 col-sm-10">
                    <h2>Apply for Your Free Account</h2>
                    <p> LeadMeHome is a FREE tool to our community members </p>

                    {/* <GoogleAuth/> */}
                    {/* <form class="signupForm"> */}
                    <div class="form-group" onKeyDown={this._handleKeyPress}>
                        <label for="email">Your best Email Address:</label>
                        <input 
                            type="email" 
                            class="col-md-9 emailInput" 
                            id="email" 
                            placeholder="Enter email*" 
                            name="email" 
                            required
                            onChange={this.handleEmailInputChange}
                            value={this.state.email}
                        />
                        <div className="invalidField">
                            {this.state.emailValidationMessage}
                        </div>


                        <input 
                            type="password" 
                            class="col-md-9 emailInput mt-3" 
                            id="password" 
                            placeholder="Enter password*" 
                            name="password" 
                            required
                            onChange={this.handlePasswordInputChange}
                            value={this.state.password}
                        />
                        <div className="invalidField">
                            {this.state.passwordValidationMessage}
                        </div>


                        <input 
                            type="password" 
                            class="col-md-9 emailInput mt-3" 
                            id="password2" 
                            placeholder="Confirm your password*" 
                            name="password2" 
                            required
                            onChange={this.handlePassword2InputChange}
                            value={this.state.password2}
                        />
                        <div className="invalidField">
                            {this.state.password2ValidationMessage}
                        </div>

                    </div>
                        
                        <button class="signUpBtn col-md-9 mt-3" onClick={()=>this.register()}>Apply Now</button>
                    {/* </form> */}
                    <div class="col-md-12">
                        <p>By Applying you agree to our <a href=""> Terms of Service and Privacy</a></p>
                    </div>


                    <ReactNotification 
                        types={[{
                            htmlClasses: ["notification-awesome"],
                            name: "awesome"
                        }]} 
                        ref={this.notificationDOMRef} 
                        style="text-align:left !important"
                    />            

                </div>
            </div>
         </div>
      )
   }
}
