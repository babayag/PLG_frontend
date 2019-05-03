import React, { Component } from 'react';
import { NavBar } from "../../../../components/NavBar";
import { Finder } from "../../../../components/Finder"

export class EmailsFinderPage extends Component {
  

    render() {
        return (
            <div className="finderContainer">
                <NavBar/>
               
                <Finder/>
            </div>
        );
    }
}
