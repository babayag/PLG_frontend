import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { SignupPage } from "./SignupPage";
import logo from '../plg_logo.png';

const toogleMenu = <FontAwesomeIcon icon={faBars}/>
const signInIcon = <FontAwesomeIcon icon={faSignInAlt}/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class NavBar extends Component {

    classToggle() {
        const navs = document.querySelectorAll('.Navbar__Items')
        navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    }

    render() {
        return (
            <header className="s-header">

                <div className="header-logo">
                    <a className="site-logo" href="/">
                        <img src={logo} alt="Homepage"/>
                    </a>
                </div>

                {/* <div className="menuDiv">
                    <a className="menuLink" href="https://support.leadmehome.io/blog/">Top Articles</a>
                    <a className="menuLink" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">I Suck at Cold Email Course</a>

                </div> */}

                <div className="menuDiv">
                    <div className="Navbar__Link Navbar__Link-toggle" onClick={this.classToggle}>
                    <i >{toogleMenu}</i>
                    </div>
                    <div class="Navbar__Items">
                        <div class="Navbar__Link dropdown">
                          <div>
                              <a class="dropbtn" className="menuLink" href="#">Products {chevronDown}</a>
                              <div class="dropdown-content">
                              <a id="dropbtn" href="/finder">Email Finder</a>
                              <a id="dropbtn" href="/bulksearch">Bulk Search</a>
                              <a id="dropbtn" href="/chrome">Chrome Extension</a>
                              <a id="dropbtn" href="/firefox">Firefox Extension</a>
                            </div>
                          </div>
                        </div>
                        <div class="Navbar__Link">
                            <a className="menuLink" href="https://support.leadmehome.io/blog/">Top Articles</a>
                        </div>
                        <div class="Navbar__Link">
                            <a className="menuLink" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">I Suck at Cold Email Course</a>
                        </div>
                        <div className="Navbar__Link login">
                            <a href="/login" >Log In <span>{signInIcon}</span></a>
                        </div>
                    </div>

                </div>



                {/* <ResponsiveMenu
                    menuOpenButton={<div />}
                    menuCloseButton={<div />}
                    changeMenuOn="900px"
                    largeMenuClassName="large-menu-classname"
                    smallMenuClassName="small-menu-classname"
                    className="menuDiv"
                    menu={
                    <ul>
                        <li><a className="menuLink" href="https://support.leadmehome.io/blog/">Top Articles</a></li>
                        <li> <a className="menuLink" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">I Suck at Cold Email Course</a></li>
                    </ul>
                    }
                /> */}

                {/* <div className="authenticationDiv">
                    <a href="/login" className="login">Log In <span>{signInIcon}</span></a>
                    <a href="/signup"> <button className="register">Register </button></a>
                </div> */}

            </header>
        );
    }
}
