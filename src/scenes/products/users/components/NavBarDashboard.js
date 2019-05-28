import React, { Component } from 'react';
import {connect} from "react-redux";
import {auth} from "../../../actions";
import logo from '../../../../images/plg_logo.png';
import userLogo from '../images/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>


class NavBarDashboard extends Component {
  
  constructor(props)
  {
    super(props);
  }

  state = {
    email :"refresh....",
  }
    /***
         * description: dropdown menu
         * params: void
         * return: void
         */
    toggle = () => {
      const el = findDOMNode(this.refs.dropdown__content);
      $(el).slideToggle();
    }
    /***
         * description: this method delete completly current user token
         * params: void
         * return: void
         */
    logout = () => {

      localStorage.removeItem("token");
      window.location.reload();
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
                    <div class="dropdown dashboard__dropdown">
                        <button class="dropbtn">Products {chevronDown}</button>
                        <div class="dropdown-content">
                        <a href="/dashboard/finder">Email Finder</a>
                        <a href="/dashboard/lead">Lead Finder</a>
                        <a href="/dashboard/bulksearch">Bulk Search</a>
                        <a href="/dashboard/chrome">Chrome Extension</a>
                        <a href="/dashboard/firefox">Firefox Extension</a>
                      </div>
                    </div>
                    {/*<a className="finder__link" href="/dashboard/finder">Finder</a>
                    <a className="finder__link" href="/dashboard/lead">Lead</a>*/}
                    <img class="header__profile-img" src={userLogo} alt="Homepage"/>
                    <h3 class="header__profile-name">{this.props.user ? this.props.user.email : this.state.email }</h3>
                    <h3 onClick={this.toggle} class="header__chevron-down">{chevronDown}</h3>

                    <ul ref="dropdown__content" class="dropdown__content">
                      {/* <li><a href="/profile">Profile</a></li> */}
                      <li ><a href="/dashboard/history/leadsearch">Searches</a></li>
                      <li ><a href="/dashboard/history/payment">Payments</a></li>
                      <li ><a href="/" onClick={this.logout}>Logout</a></li>
                    </ul>
                </div>
            </header>
          </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(auth.logout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBarDashboard);
