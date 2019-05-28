import React, { Component } from 'react';
import queryString from 'query-string';
import {executePayments} from '../../../../../../services/Api/paymentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="5x" spin/>

class DashboardPayment extends Component {
    async componentDidMount (){

        const parsed = queryString.parse(window.location.search);

        
        let forfaitId = localStorage.getItem("idForfait")

        let data = {...parsed, email: this.props.user.email, idForfait:forfaitId}

    
        executePayments(data).then(res => {
            console.log(res);
            if(res.status === 200 || res.status === 201)
            {
                this.setState({
                    isLoading : false,
                })
                window.location.href = "/dashboard/lead";
                // localStorage.setItem("idForfait", null)
            }else
            {
                console.log('error of notification ');
                this.addNotification("Please refresh the page and retry again")
            }
        })
    }
    

    render() {
        return (
            <div>
                <div className="container plugin__page chrome__page">
                    <div className="row justify-content-center">
                        <div className="content col-sm-11 col-md-9 col-lg-7">
                            <h1>Payment Processing...</h1>
                            <br/>
                            <br/>
                            <span>{spinner}</span>
                            
                        </div>
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

export default connect(mapStateToProps)(DashboardPayment)