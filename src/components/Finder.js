import React, { Component } from 'react';
import { NavBar } from "./NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

const search = <FontAwesomeIcon icon={faSearch} color="#333333" size="1x"/>

export class Finder extends Component {
    constructor(props){
        super(props);

        this.state = {
         }
    }

    render() {
        return (
            <div className="finderContainer">
                <NavBar/>
                <div class="finder">
                  <div class="inner">
                    <div>
                      <h3>Email Finder</h3>
                    </div>
                    <div class="inputs">
                      <input type="text" placeholder="John Doe" class="finder__name" />
                      <h4>@</h4>
                      <input type="text" placeholder="company.com" class="finder__domain" />
                      <button class="finder__btn">{search}</button>
                    </div>
                    <p>Enter a full name and the domain name of the email address (for example "leadmehome.io").</p>
                  </div>
                </div>
            </div>
        );
    }
}
