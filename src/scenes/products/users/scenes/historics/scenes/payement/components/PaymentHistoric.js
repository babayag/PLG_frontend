
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { getAllPayments } from '../../../../../../../../services/Api/historicService';
import  moment  from 'moment'


const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>

class PaymentHistoric extends Component {

    constructor(props){
        super(props);
        this.state = {
            payments:[],
            HistoricIsLoad : false
        }
    }



    componentDidMount() {

        getAllPayments(this.props.user.email) .then(res => {
            this.setState({
                payments: res,
                HistoricIsLoad: true
            })
        })
        .catch(err => {
            
            console.log(err);
        })
        
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
        let historicList = <span className="historicPaymentSpinner"> {spinner}</span>;
        if(this.state.HistoricIsLoad) { 
            historicList = this.state.payments.map(payement => (
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
    }
}

export default connect(mapStateToProps)(PaymentHistoric);