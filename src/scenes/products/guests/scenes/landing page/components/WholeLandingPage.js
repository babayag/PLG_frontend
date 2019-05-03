import React, { Component } from 'react';
import { NavBar } from "../../../../components/NavBar";
import { LandingPage } from "./LandingPage";
import { SearchBar } from "../../../../components/SearchBar";



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