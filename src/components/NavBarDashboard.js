import React, { Component } from 'react';
import logo from '../plg_logo.png';
import userLogo from '../user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class NavBarDashboard extends Component {

    toggle = () => {
      const el = findDOMNode(this.refs.dropdown__content);
      $(el).slideToggle();
    }

    render() {
        return (
          <div class="dashboard__page">
            <header className="s-header dashboard__header">
                <div className="header-logo">
                    <a className="site-logo" id="site-logo" href="/dashboard">
                        <img class="logo" src={logo} alt="Homepage"/>
                    </a>
                </div>

                <div className="header__profile-section">
                    <a className="finder__link" href="/dashboard/finder">Finder</a>
                    <a className="finder__link" href="/dashboard/lead">Lead</a>
                    <img class="header__profile-img" src={userLogo} alt="Homepage"/>
                    <h3 class="header__profile-name">John Doe</h3>
                    <h3 onClick={this.toggle} class="header__chevron-down">{chevronDown}</h3>

                    <ul ref="dropdown__content" class="dropdown__content">
                      <li><a href="/profile">Profile</a></li>
                      <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </header>
          </div>
        );
    }
}