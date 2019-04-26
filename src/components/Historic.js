
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import NavBarDashboard from './NavBarDashboard';
import stanley_img from '../dr_stanley.png';
import ReactNotification from "react-notifications-component";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Forfait from './Forfait'

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>
const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>
const smallerSpinner = <FontAwesomeIcon icon={faSpinner} color="#fff" size="2x" spin/>

class Historic extends Component {

    constructor(props){
        super(props);
        this.state = {
            payments:[],
            HistoricIsLoad : false
        }
    }



    componentDidMount() {

        let devUrlLocal = "http://127.0.0.1:8000/api/lead/getAllPayement";
        let user = { email: this.props.user.email };
        try {
            axios.post(devUrlLocal,user)
            .then(res => {
                this.setState({
                    payments: res.data,
                    HistoricIsLoad: true
                })
            })
            .catch(err => {
                
                console.log(err);
            })
        } catch (e) {
            console.log(e)
        }
    }


    showAndHide(){
        this.setState({
            isLoading : true,
        })
    }

    /*Displays the notifications with the following chraracteristics */
    addNotification(title, message) {
        this.notificationDOMRef.current.addNotification({
            title: title,
            message: message,
            type: "awesome",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 5000 },
            dismissable: { click: true }
        });
    }

    

    render() {
        let historicList = <span className="historicSpinner"> {spinner}</span>;
        if(this.state.HistoricIsLoad) { 
            historicList = this.state.payments.map(payement => (
                <tr><td>{payement.description}</td> <td>${payement.price}</td><td>{payement.date}</td> 
                <td className="display_valid">{payement.Isvalid ? "valid" : "expired"}</td></tr>
            ))
          
        }

        return (
            <div class="dashboard__page">
                <NavBarDashboard />
                <div className="historic" >


                    <div className="historicData">
                       
                         <h1 id="title_h"> Transaction History</h1> 
                            <table id="historictable">  
                                <tr>
                                    <th className="description">Forfait description</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th className="isvalid">Isvalid</th>
                                </tr>

                                    {historicList}
                    
                            </table>
  

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Historic);