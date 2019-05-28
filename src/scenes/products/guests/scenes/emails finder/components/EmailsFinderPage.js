import React, { Component } from 'react';
import { NavBar } from "../../../../common/NavBar";
import { Finder } from "../../../../common/Finder"

export class EmailsFinderPage extends Component {
  

    render() {
        return (
            <div className="finderContain">
                <NavBar/>
               
                <Finder shouldSetClassName={false}/>
            </div>
        );
    }
}
