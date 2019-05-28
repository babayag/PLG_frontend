import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
// import { GoogleAuth } from "./googleAuth";
import {connect} from "react-redux";
import {auth} from "../../../actions";
import logo from '../../../../images/plg_logo.png';
import ReactNotification from "react-notifications-component";
import {checkIfEmpty} from "../../utilities/authUtilities";


class LoginPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: "",
        password: "",
        emailValidationMessage:"",
        passwordValidationMessage: "",
        allowOnchange: false,   //this is to display the error messages when the user tries to register but with incorrect inputs
        
    }

      /*Without these, notification won't work */
      this.addNotification = this.addNotification.bind(this);
      this.notificationDOMRef = React.createRef();
    }
    
    

    login = e => {
      //  console.log(this.props.errors[0].message);  
      //e.preventDefault();
      this.setState({  //now the validation will directly be know everytime the user changes a field, see onchanges functions above
        allowOnchange: true,
        passwordValidationMessage: checkIfEmpty(this.state.password),
        emailValidationMessage: checkIfEmpty(this.state.email), 
      })
      
      if(this.state.allowOnchange && this.props.errors[0].message == "Authentication credentials were not provided." || 
      this.props.errors[0].message == "This field may not be blank." ||
      this.props.errors[0].message == "No active account found with the given credentials"){
        this.addNotification("Invalid email or password.")
      }

      else{
      // console.log(this.props.login(this.state.email, this.state.password)); 
        this.props.login(this.state.email,this.state.password)                                  
      }
    }

      handleChange = e => {
      //console.log(e.target.value);
      this.setState({
        [e.target.name]: e.target.value,
      });

      /*focus on the keyboard changes only when the user has tried to register at least once*/
      if(this.state.allowOnchange){
        this.setState({ 
          passwordValidationMessage: checkIfEmpty(this.state.password),
          emailValidationMessage: checkIfEmpty(this.state.email), 
        })
      }
    };

    _handleKeyPress = e => { // When user presses on a keyboardtouch
      if(e.keyCode === 13){
          this.login();
      }
    }

    addNotification = (message) => {
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
                      <div class="col-md-12">
                          <p className=""> 
                            Not yet a member? <a href="/signup">Register</a>
                          </p>
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
      login: (email, password) => {
        return dispatch(auth.login(email, password));
      }
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);