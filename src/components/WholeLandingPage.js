import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import { SignupPage } from "./SignupPage";
import logo from '../plg_logo.png';
import { NavBar } from "./NavBar";
import { LandingPage } from "./LandingPage";
import { SearchBar } from "./SearchBar";
import { SpinerComponent } from "./SpinerComponent";


export class WholeLandingPage extends Component {
    render() {
        return (
            <div>
                
                <NavBar/>
                    
                <LandingPage/>

                <SearchBar/>
                
            </div>
        );
    }
}