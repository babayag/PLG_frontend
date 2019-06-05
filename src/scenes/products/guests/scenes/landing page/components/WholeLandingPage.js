import React, { Component } from 'react';
import { NavBar } from "../../../../common/NavBar";
import { LandingPage } from "./LandingPage";
import SearchBar  from "../../../../common/SearchBar";



export class WholeLandingPage extends Component {
    render() {
        return (
            <div>
                
                <NavBar/>
                    
                <LandingPage/>

                <div id="search__bar"><SearchBar/></div>
                
            </div>
        );
    }
}