
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getAllPayments } from '../../../../../../../../services/Api/historicService';
import  moment  from 'moment';
import { fetchHistoric } from '../../../../../../../actions/historics/paymentHistoric'


const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>

class PaymentHistoric extends Component {

    constructor(props){
        super(props);
    }



    componentDidMount() {

        /***
         * description: calls getAllPayments service to get the list of all the payments the user has ever made
         * params:  email: email of the current user   
         * return: void
        */        
        this.props.fetchPaymentHistoric(this.props.user.email);
    }

    /***
     * description: triggers the state that shows and hide spinner when searching emails
     * params: void
     * return: void
     */
    showAndHide(){
        this.setState({
            isLoading : true,
        })
    }

    /***
     * description: Displays the notification with the provided chraracteristics
     * params: title: title of notification, message: message displayed in the notificatio body
     * return: void
     */
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
        let historicList = <span className="historicPaymentSpinner"> {spinner}</span>;
        if(this.props.payments.isPaymentHistoricLoaded) { 
            historicList = this.props.payments.payments.map(payement => (
                <tr><td>{payement.description}</td> <td>${payement.price}</td><td>{moment(payement.date).format("ddd GG MMM YYYY HH:mm",'en')}</td> 
                <td className="display_valid">{payement.Isvalid ? "valid" : "expired"}</td></tr>
            ))
          
        }

        return (
            <div class="dashboard__page">
                <div className="historic" >


                    <div className="historicData">
                       
                         <h1 id="title_h"> Transaction History</h1> 
                            <table id="historictable">  
                                <tr>
                                    <th className="description">Forfait description</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                    <th className="isvalid">Validity</th>
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
        payments: state.paymentHistoric
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPaymentHistoric: (email) => {
            dispatch(fetchHistoric(email));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHistoric);