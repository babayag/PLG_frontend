/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import stanley_img from '../../../images/dr_stanley.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import NavBarDashboard from '../../../../users/components/NavBarDashboard';
import { SearchBar } from '../../../../common/SearchBar';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const search = <FontAwesomeIcon icon={faSearch} color="white" size="2x"/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class Dashboard extends Component {

    constructor(){
        super()
        this.state={
            isLoading: false
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
              </div>

              <div class="dashboard__content--right">
             
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
          </div>
        );
    }
}
