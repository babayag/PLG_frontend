import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';

export class DashboardPayment extends Component {
    async componentDidMount (){

        const parsed = queryString.parse(window.location.search);
        console.log(parsed);

        let devUrlLocal = "/api/lead/executePayment";
        try {
            const res = await axios.post(devUrlLocal, parsed) //await fetch(devUrl);
            if(res.status === 200 || res.status === 201)
            {
                this.setState({
                    isLoading : false,
                })
                window.location.href = "/dashboard";
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
                            <h1>Processing Payment...</h1>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
