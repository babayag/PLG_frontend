import React, { Component } from 'react';
import {connect} from "react-redux";
// import { GoogleAuth } from "./googleAuth";
import axios from 'axios';
import {auth} from "../../../actions";
import {Link, Redirect} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import {register} from "../../../../services/Api/authService";
import {checkEmailValidation, checkPasswordValidation} from "../../utilities/authUtilities";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import logo from '../../../../images/plg_logo.png';

const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="1x" spin/>


class SignupPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isRegistering : false,
            isRegister : false,
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

    /* 
    * description : the method handle the change on email field
    * params : e (event)
    * return : void
    */
    handleEmailInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        /*focus on the keyboard changes only when the user has tried to register at least once*/
        if(this.state.allowOnchange){
            this.setState({
                emailValidationMessage: checkEmailValidation(this.state.email)
            })
        }
    };

     /* 
    * description : the method handle the change on password field
    * params : e (event)
    * return : void
    */
    handlePasswordInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        /*focus on the keyboard changes only when the user has tried to register at least once*/
        if(this.state.allowOnchange){
            this.setState({
                passwordValidationMessage: checkPasswordValidation(this.state.password)
            })
        }
    };

     /* 
    * description : the method handle the change on password confirmation field
    * params : e (event)
    * return : void
    */
    handlePassword2InputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

        /*focus on the keyboard changes only when the user has tried to register at least once*/
        if(this.state.allowOnchange){
            this.setState({
                password2ValidationMessage: checkPasswordValidation(this.state.password2)
            })
        }
    };

     /* 
    * description : the method handle the click on button register
    * params : e (event)
    * return : void
    */
    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if(e.keyCode === 13){
            this.registerUser();
        }

    }

    /* 
    * description : the method register the user 
    * params : 
    * return : void
    */
    async registerUser(){  
        await this.showAndHide();
        this.state.isRegistering = false;
        
        this.setState({ //now the validation will directly be know everytime the user changes a field, see onchanges functions above
            allowOnchange: true,
            emailValidationMessage: checkEmailValidation(this.state.email),
            passwordValidationMessage: checkPasswordValidation(this.state.password),
            password2ValidationMessage: checkPasswordValidation(this.state.password2)  
        })
        console.log(this.state.emailValidationMessage);

        if(this.state.password != this.state.password2){ //if passwords do not match
            this.addNotification("Passwords do not match.")
        }
        
        else{ 

            /*We can freely send the request */

        
            try { 
                const res = await register(this.state.email, this.state.password); //await fetch(devUrl);
                console.log(res)
                
                if(res.status === 200 || res.status === 201)
                {
                    this.setState({
                        isRegister : true,
                    })
                } 
                else
                {
                    console.log('error of notification ');
                    this.addNotification("Please refresh the page and retry again")
                }
            }
            catch(e){
                // this.addNotification("Email already exists or too common Password.")
                console.log(e)
            }         

        }
    }

    
    showAndHide(){
        this.setState({
          isRegistering : true,
        })
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
        if (this.state.isRegister) {
            return <Redirect to="/login" />
        }
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
                        
                         <button class="signUpBtn col-md-9 mt-3" onClick={()=>this.registerUser()} disabled={this.state.isRegistering} >
                           {this.state.isRegistering ? <span>{spinner}</span> :
                                <span>Apply now</span>
                            }
                        </button>
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

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
      errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
      });
    }
    return {
      errors,
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      register: (username, password) => dispatch(auth.login(username, password)),
    };
  }  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);