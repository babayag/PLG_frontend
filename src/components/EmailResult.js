import React, { Component } from 'react';


export class EmailResult extends Component {
    render() {
        return (
            <div class="emailResult">
                <div class="email">
                    <span class=""> {this.props.result.email}  </span>       
                </div> 
                <div class="url">
                    <span class=""> {this.props.result.url} </span>  
                </div>                 
            </div>
        );
    }
}