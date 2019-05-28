import React, { Component } from 'react';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import NavBarDashboard from "../../../components/NavBarDashboard";
import CSVReader from "react-csv-reader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import stanley_img from '../../../../users/images/dr_stanley.png';
import { BulkSearch } from '../../../../common/BulkSearch'
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";



const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class DasboardBulkSearch extends Component {
  
  render() {
    return (
      <div className="bulkSearchContainer">
        <NavBarDashboard/>
        <div>
            {/* <span>Left Side</span> */}
            <div class="lead__dashboard">
                <div class="lead__dashboard__content">
                    <div class="lead__dashboard--left">
                        <div class="fileReader dashboard__content--left">
                            <BulkSearch/>
                        </div>
                        <ReactNotification
                        types={[{
                            htmlClasses: ["notification-awesome"],
                            name: "awesome"
                        }]}
                        ref={this.notificationDOMRef}
                        style="text-align:left !important"
                        />
                    </div>

                    {/* <span>Left Side</span> */}
                    <div class="lead__dashboard--right">
                        {/* <div class="recent__search">
                            <h3>Saved Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                        </div> */}

                        {/* <div class="recent__searchs" ref="recent__search">
                            ...
                        </div> */}
                        <div class="coldemail__title"><h3><span>LEARN HOW TO </span><b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK</a></b></h3></div>
                        <div class="video__course">
                        <a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">
                            <img src={stanley_img} />
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
