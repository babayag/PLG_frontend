/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import NavBarDashboard from '../../../components/NavBarDashboard';
import MappleToolTip from 'reactjs-mappletooltip';
import ReactNotification from "react-notifications-component";
import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import DashboardLead from '../../../../common/DashboardLead'

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>
const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>
const smallerSpinner = <FontAwesomeIcon icon={faSpinner} color="#fff" size="2x" spin/>
const smallerSpinnerViolet = <FontAwesomeIcon icon={faSpinner} color="#212529" size="1x" spin />
const valid = <FontAwesomeIcon icon={faCheck} color="#4EB92D"/> 
const invalid = <FontAwesomeIcon icon={faTimes} color="#FF0515"/> 

class DashboardLeadFinderPage extends Component {
  
    render() {
       
        return (
            <div class="dashboard__page">
                <NavBarDashboard />
                <DashboardLead />
               
            </div>
        );
    }
}
    
export default (DashboardLeadFinderPage);