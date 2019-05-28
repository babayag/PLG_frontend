import React, { Component } from 'react';
import  NavBarDashboard from "../../../components/NavBarDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import MappleToolTip from 'reactjs-mappletooltip';
import ReactNotification from "react-notifications-component";
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import stanley_img from '../../../../users/images/dr_stanley.png';
import { Finder }  from "../../../../common/Finder"
import { findDOMNode } from 'react-dom';
import idGenerator from 'react-id-generator';
import $ from 'jquery';

const search = <FontAwesomeIcon icon={faSearch} color="white" size="1x"/>
const valid = <FontAwesomeIcon icon={faCheck} color="#4EB92D"/>   //this is the green checked icon to testify that an email is valid
const spinner = <FontAwesomeIcon icon={faSpinner} color="#333333" size="2x" spin/>
const questionCirle = <FontAwesomeIcon icon={faQuestionCircle} color="#33313165" size="1x"/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class DashboardFinder extends Component {
    
    render() {
        return (
            <div className="finderContainer">
                <NavBarDashboard/>
                <div class="dashboard__content">
                    <div class="dashboard__content--left">
                        
                        <Finder/>
                        
                    </div>

                    <div class="dashboard__content--right">
                        {/* <div class="recent__search">
                        <h3>Recents Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                        </div>

                        <div class="recent__searchs" ref="recent__search">
                        <h3>Recents</h3>
                        </div> */}

                        <div class="coldemail__title"><h3><span>LEARN HOW TO </span><b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK</a></b></h3></div>
                        <div class="video__course">
                        {/* <video width="100%" height="100%" controls poster={stanley_img}>
                            <source src="movie.mp4" type="video/mp4" />
                        </video> */}
                        <a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">
                            <img src={stanley_img} />
                        </a>
                        </div>
                    </div>
                </div>

                <ReactNotification types={[{
                    htmlClasses: ["notification-awesome"],
                    name: "awesome"
                }]} ref={this.notificationDOMRef} />
            </div>
        );
    }
}
