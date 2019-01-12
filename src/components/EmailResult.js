import React, { Component } from 'react';


export class EmailResult extends Component {
    render() {
        return (
            <div class="resultBlock"> 
                <div class="quaterWidthDiv"> </div>
                <div class="emailResult">
                    <div class="email">
                        <p class=""> {this.props.result.email}  </p>       
                    </div> 
                    <div class="source">
                        <p class=""> 
                         {this.props.result.url.length == 1 ? 
                            <p>{this.props.result.url.length} source</p>
                            : <p>{this.props.result.url.length} sources</p>
                         }
                        </p>  
                    </div>
                    {/* <div class="url">
                        <p class=""> {this.props.result.url} </p>  
                    </div>                  */}
                </div>
                <div class="quaterWidthDiv"> </div>
            </div>
        );
    }
}