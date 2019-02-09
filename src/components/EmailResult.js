import React, { Component } from 'react';


export class EmailResult extends Component {
    constructor(){
        super()
        this.state={
            showResult: false,
            showUpIcon: true
        }
    }

    showAndHide(){
        this.setState({
            showResult:!this.state.showResult,
            showUpIcon: !this.state.showUpIcon
        })
    }


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
                         {/* {this.props.result.url.length === 1 ? 
                            <p>{this.props.result.url.length} source {this.state.showUpIcon ? 
                                <i class="fa fa-angle-down" onClick={()=>this.showAndHide()}></i>
                                : <i class="fa fa-angle-up" onClick={()=>this.showAndHide()}></i> }
                            </p>
                            : <p>{this.props.result.url.length} sources {this.state.showUpIcon ? 
                                <i class="fa fa-angle-down" onClick={()=>this.showAndHide()}></i>
                                : <i class="fa fa-angle-up" onClick={()=>this.showAndHide()}></i> }
                            </p>
                         } */}
                        </p>  
                    </div>
                    {     
                        this.state.showResult?
                            <div class="url">
                                { this.props.result.url.map((url) =>
                                <p >
                                   <a href={url}> {url} </a>
                                </p>
                                )}            
                            </div>
                        :null                  
                    }
                </div>
                <div class="quaterWidthDiv"> </div>
            </div>
        );
    }
}