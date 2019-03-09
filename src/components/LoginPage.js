import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
// import { GoogleAuth } from "./googleAuth";
import {connect} from "react-redux";
import {auth} from "../actions";
import logo from '../plg_logo.png';

class LoginPage extends Component {
    state = {
        email: "",
        password: "",
    }

    loginit = e => {
        //e.preventDefault();
        console.log(this.props.login(this.state.email, this.state.password)); 
      }

      handleChange = e => {
        //console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
      if (this.props.isAuthenticated) {
        return <Redirect to="/dashboard" />
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
                      <h2>Welcome Back!</h2>
                      {/* <p> LeadMeHome is a FREE tool to our community members </p> */}
  
                      {/* <GoogleAuth/> */}
                      <div class="signupForm" action="/">
                          <div class="form-group">
                              {/* <label for="email">Your best Email Address:</label> */}
                              <input type="email" class="col-md-9 emailInput logInInputs" id="email" placeholder="Email" name="email" onChange={this.handleChange}
                            value={this.state.email} required/>
                              <input type="password" class="col-md-9 emailInput logInInputs" id="password" placeholder="Password" name="password" onChange={this.handleChange}
                            value={this.state.password} required/>

                          </div>
                          
                          <button onClick={() => this.loginit()} class="signUpBtn loginBtn col-md-9">Sign In</button>
                      </div>
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
      login: (email, password) => {
        return dispatch(auth.login(email, password));
      }
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);