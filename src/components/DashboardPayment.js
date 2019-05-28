import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { connect } from 'react-redux';

class DashboardPayment extends Component {
    async componentDidMount (){

        const parsed = queryString.parse(window.location.search);

        
        let forfaitId = localStorage.getItem("idForfait")

        let data = {...parsed, email: this.props.user.email, idForfait:forfaitId}

        let devUrlLocal = "http://127.0.0.1:8000/api/lead/executePayment";
        try {
            const res = await axios.post(devUrlLocal, data) //await fetch(devUrl);
            if(res.status === 200 || res.status === 201)
            {
                this.setState({
                    isLoading : false,
                })
                window.location.href = "/dashboard";
                // localStorage.setItem("idForfait", null)
            }else
            {
                console.log('error of notification ');
                this.addNotification("Please refresh the page and retry again")
            }
        }
        catch(e){
            console.log(e)
        }

    }

    render() {
        return (
            <div>
                <div className="container plugin__page chrome__page">
                    <div className="row justify-content-center">
                        <div className="content col-sm-11 col-md-9 col-lg-7">
                            <h1>Payment Processing...</h1>
                            
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