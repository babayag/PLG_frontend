import React, { Component } from 'react';
import { NavBar } from '../../../../common/NavBar';
import  Lead  from '../../../../common/Lead'

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
