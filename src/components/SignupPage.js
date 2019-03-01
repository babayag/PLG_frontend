import React, { Component } from 'react';
// import { GoogleAuth } from "./googleAuth";
import Input from 'react-validation/build/input';
import logo from '../plg_logo.png';

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
            password2ValidationMessage: ""
        }
    }

    handleEmailInputChange = e => { 
        this.setState({
            [e.target.name]: e.target.value
        });

        var emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]+/;
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
    };

    handlePasswordInputChange = e => { 
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handlePassword2InputChange = e => { 
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if(e.keyCode === 13){ 
            // do stuffs
        }

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
                        
                        <button class="signUpBtn col-md-9 mt-3">Apply Now</button>
                    {/* </form> */}
                    <div class="col-md-12">
                        <p>By Applying you agree to our <a href=""> Terms of Service and Privacy</a></p>
                    </div>

                                        

                </div>
            </div>
         </div>
      )
   }
}
