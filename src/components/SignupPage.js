import React, { Component } from 'react';
// import { GoogleAuth } from "./googleAuth";

import logo from '../plg_logo.png';

export class SignupPage extends Component {

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
                    <form class="signupForm" action="/">
                        <div class="form-group">
                            <label for="email">Your best Email Address:</label>
                            <input type="email" class="col-md-9 emailInput" id="email" placeholder="Enter email" name="email" required/>
                        </div>
                        
                        <button type="submit" class="signUpBtn col-md-9">Apply Now</button>
                    </form>
                    <div class="col-md-12">
                        <p>By Applying you agree to our <a href=""> Terms of Service and Privacy</a></p>
                    </div>

                                        

                </div>
            </div>
         </div>
      )
   }
}
