import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import { SignupPage } from "./SignupPage";
import logo from '../plg_logo.png';

export class NavBar extends Component {
    render() {
        return (
            <header className="s-header">

                <div className="header-logo">
                    <a className="site-logo" href="/">
                        <img src={logo} alt="Homepage"/>
                    </a>
                </div>

                <div className="menuDiv">
                    <a className="menuLink" href="https://support.leadmehome.io/blog/">Blog</a>

                </div>

                <div className="authenticationDiv">
                    {/* <a href="/login" className="login">Log In</a>    */}
                    {/* <a href="/signup"> <button className="register">Register </button></a> */}
                </div>
            
            </header> 
        );
    }
}