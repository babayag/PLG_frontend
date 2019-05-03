import React, { Component } from 'react';
import { NavBar } from '../../../../components/NavBar';
import { Lead } from '../../../../components/Lead'

export class LeadsPage extends Component {


    render() {
       
        return (
            <div class="dashboard__page">
                <NavBar />
                
                <Lead/>
            </div>
        );
    }
}
