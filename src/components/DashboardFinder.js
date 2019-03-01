import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { NavBarDashboard } from './NavBarDashboard';
import { SearchBar } from './SearchBar';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class DashboardFinder extends Component {

    toggle = () => {
      const el = findDOMNode(this.refs.recent__search);
      $(el).slideToggle();
    }

    render() {
        return (
          <div class="dashboard__page">
            <NavBarDashboard />

            <div class="finder__dashboard">
                <div class="row sub__banner">
                    <div class="col-md-10 col-sm-12 col-lg-7">
                        <div class="inputs">
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
                    </div>
                </div>

                <div className="row dashboard__finder__content">
                    <div className="col-sm-12 col-md-12 col-lg-3">
                        <div class="recent__search">
                            <h3>Saved Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                        </div>

                        <div class="recent__searchs" ref="recent__search">
                            <h3>Saved Search List</h3>
                            <h3>Saved Search List</h3>
                            <h3>Saved Search List</h3>
                            <h3>Saved Search List</h3>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-9 mt-1">
                        <table class="table dashboard__finder__results">
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
                </div>
            </div>
          </div>
        );
    }
}
