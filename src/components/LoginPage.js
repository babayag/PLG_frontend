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
        emailValidationMessage:"",
        passwordValidationMessage: "",
        userNotFoundMsg: "",
        allowOnchange: false,   //this is to display the error messages when the user tries to register but with incorrect inputs
        
    }

    login = e => { 
        //e.preventDefault();
      /*this.setState({  //now the validation will directly be know everytime the user changes a field, see onchanges functions above
        allowOnchange: true  
      })

      if(this.state.password == ""){
        this.setState({
          passwordValidationMessage: "This field should not be empty"
        })
      }

      if(this.state.email == ""){
        this.setState({
          emailValidationMessage: "This field should not be empty"
        })
      }
      /*
      if(1==1){
        this.setState({
          userNotFoundMsg: "User not found."
        })
      }*/

      // console.log(this.props.login(this.state.email, this.state.password)); 
      
      this.props.login(this.state.email,this.state.password)                                  


    }

      handleChange = e => {
      //console.log(e.target.value);
      this.setState({
        [e.target.name]: e.target.value,
        userNotFoundMsg: ""
      });

      /*focus on the keyboard changes only when the user has tried to register at least once*/
      if(this.state.allowOnchange){
        if(this.state.password == ""){
          this.setState({
            passwordValidationMessage: "This field should not be empty"
          })
        }else{
          this.setState({
            passwordValidationMessage: ""
          })
        }
        if(this.state.email == ""){
          this.setState({
            emailValidationMessage: "This field should not be empty"
          })
        }else{
          this.setState({
            emailValidationMessage: ""
          })
        }
      }
    };

    _handleKeyPress = e => { // When user presses on a keyboardtouch
      if(e.keyCode === 13){
          this.login();
      }
    }

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
                      <div class="signupForm" onKeyDown={this._handleKeyPress}>
                        <div class="form-group">
                          {/* <label for="email">Your best Email Address:</label> */}
                          <input type="email" class="col-md-9 emailInput logInInputs" id="email" placeholder="Email" name="email" onChange={this.handleChange}
                            value={this.state.email} required
                          />
                          <div className="invalidField">
                            {this.state.emailValidationMessage}
                          </div>

                          <input type="password" class="col-md-9 emailInput logInInputs" id="password" placeholder="Password" name="password" onChange={this.handleChange}
                            value={this.state.password} required
                          />
                          <div className="invalidField">
                            {this.state.passwordValidationMessage}
                          </div>
                        </div>
                        
                        <button onClick={() => this.login()} class="signUpBtn loginBtn col-md-9">Sign In</button>
                      </div>
                      <div className="invalidField">
                            {this.state.userNotFoundMsg}
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