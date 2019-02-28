import React, { Component } from 'react';
import { NavBar } from "./NavBar";
import logo from '../plg_logo.png';
import userLogo from '../user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { NavBarDashboard } from './NavBarDashboard';
import { SearchBar } from './SearchBar';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { SearchResults} from './SearchResults';
import { EmailResult } from "./EmailResult";

const search = <FontAwesomeIcon icon={faSearch} color="#333333" size="2x"/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class Dashboard extends Component {

    constructor(){
        super()
        this.state={
            // emails: emails
        }
    }

    toggle = () => {
      const el = findDOMNode(this.refs.recent__search);
      $(el).slideToggle();
    }

    render() {
        return (
          <div class="dashboard__page">
            <NavBarDashboard />

            <div class="dashboard__content">
              <div class="dashboard__content--left">
                <h3>Domain search</h3>
                <SearchBar />
                {/* <SearchResults emailList={this.state.emails}/>  */}
              </div>

              <div class="dashboard__content--right">
                <div class="recent__search">
                  <h3>Recents Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                </div>

                <div class="recent__searchs" ref="recent__search">
                  <h3>Recents</h3>
                </div>

                <div class="coldemail__title"><h3><span>LEARN HOW TO </span><b><a href="#">SEND COLD EMAIL THAT WORK</a></b></h3></div>
                <div class="video__course">
                  <video width="100%" height="100%" controls>
                    <source src="movie.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
