/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import NavBarDashboard from '../../../components/NavBarDashboard';
import DashboardLead from '../../../../common/DashboardLead';

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