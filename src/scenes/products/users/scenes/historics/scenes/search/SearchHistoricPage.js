/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import NavBarDashboard from '../../../../components/NavBarDashboard';
import  SearchHistoric  from './components/SearchHistoric';

class SearchHistoricPage extends Component {
    render() {
        return (
            <div class="dashboard__page">
                <NavBarDashboard />
                <SearchHistoric />
            </div>
        );
    }
}
    
export default (SearchHistoricPage);