/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import NavBarDashboard from '../../../../components/NavBarDashboard';
import  PaymentHistoric  from './components/PaymentHistoric';

class PaymentHistoricPage extends Component {
  
    render() {
       
        return (
            <div class="dashboard__page">
                <NavBarDashboard />
                <PaymentHistoric />
               
            </div>
        );
    }
}
    
export default (PaymentHistoricPage);