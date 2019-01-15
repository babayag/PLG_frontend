import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import { SignupPage } from "./SignupPage";
import logo from '../plg_logo.png';

export class NavBar extends Component {
    render() {
        return (
            <header class="s-header">

                <div class="header-logo">
                    <a class="site-logo" href="/">
                        <img src={logo} alt="Homepage"/>
                    </a>
                </div>

                <div class="authenticationDiv">
                    <a href="/login" class="login">Log In</a>   
                    <a href="/signup"> <button class="register">Register </button></a>
                </div>
            
            </header> 
        );
    }
}