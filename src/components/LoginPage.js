import React, { Component } from 'react';
// import { GoogleAuth } from "./googleAuth";

import logo from '../plg_logo.png';
export class LoginPage extends Component {
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
                      <h2>Welcome Back!</h2>
                      {/* <p> LeadMeHome is a FREE tool to our community members </p> */}
  
                      {/* <GoogleAuth/> */}
                      <form class="signupForm" action="/">
                          <div class="form-group">
                              {/* <label for="email">Your best Email Address:</label> */}
                              <input type="email" class="col-md-9 emailInput logInInputs" id="email" placeholder="Email" name="email" required/>
                              <input type="password" class="col-md-9 emailInput logInInputs" id="password" placeholder="Password" name="password" required/>

                          </div>
                          
                          <button type="submit" class="signUpBtn loginBtn col-md-9">Sign In</button>
                      </form>
                      <div class="col-md-12">
                          <p className=""> 
                                Not yet a member? <a href="/signup">Register</a>
                          </p>
                      </div>
  
                                          
  
                  </div>
              </div>
           </div>
        )
     }
}
