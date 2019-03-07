import React, { Component } from 'react';

export class Error extends Component {


    render() {
        return (
            <div className="page404">
                <div className="row">
                    <h1 className="error">Error :(</h1>
                    <h5>WE ARE WORKING HARD TO SOLVE IT.</h5>
                    <p>Additional Information: Error during ...</p>
                </div>
            </div> 
        );
    }
}