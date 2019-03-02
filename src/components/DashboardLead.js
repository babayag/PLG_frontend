/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { NavBarDashboard } from './NavBarDashboard';
import stanley_img from '../dr_stanley.png';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class DashboardLead extends Component {

    toggle = () => {
      const el = findDOMNode(this.refs.recent__search);
      $(el).slideToggle();
    }

    render() {
        return (
          <div class="dashboard__page">
            <NavBarDashboard />

            <div class="lead__dashboard">
                <div class="lead__dashboard__content">
                    <div class="lead__dashboard--left">
                        <div class="inputs mb-5">
                            <input 
                            type="text" 
                            name="nameToFind"
                            placeholder="Example: Chicago" 
                            className="finder__name mr-2"
                            />
                            <input type="text" 
                            name="domainToFind"
                            placeholder="Example: Dentist" 
                            className="finder__domain"
                            />
                            <button class="finder__btn dashboard_finder__btn"><span>SEARCH</span></button>
                        </div>

                        {/* <span>Table of results</span> */}
                        <table class="table dashboard__finder__results mt-5">
                            <thead class="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Business</th>
                                <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>@Resto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>@Cafe</td>
                                <td>@fat</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* <span>Left Side</span> */}
                    <div class="lead__dashboard--right">
                        <div class="recent__search">
                            <h3>Saved Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                        </div>

                        <div class="recent__searchs" ref="recent__search">
                            <h3>Saved Search List</h3>
                            <h3>Saved Search List</h3>
                            <h3>Saved Search List</h3>
                            <h3>Saved Search List</h3>
                        </div>
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
        );
    }
}
