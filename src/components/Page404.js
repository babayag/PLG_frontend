import React, { Component } from 'react';

export class Page404 extends Component {


    render() {
        return (
            <div className="page404">
                <div className="row">
                    <h1>Oops!</h1>
                    <h5>404 - PAGE NOT FOUND</h5>
                    <p>The page you are looking for might have been removed <br/>had it's name changed or it's temporarily unavailable.</p>
                    <a className="return__to__home__page" href="/">Go to Home Page</a>
                    {/* <span>IF CONNECTED</span> */}
                    {/* <a className="return__to__home__page" href="/dashboard">Go to Home Page</a> */}
                </div>
            </div> 
        );
    }
}