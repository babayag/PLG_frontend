import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faSpinner, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import idGenerator from 'react-id-generator';

const angleUp = <FontAwesomeIcon icon={faAngleUp} />
const angleDown = <FontAwesomeIcon icon={faAngleDown} />
const spinner = <FontAwesomeIcon icon={faSpinner} />

export class EmailResult extends Component {
    constructor(){
        super()
        this.id = this.htmlId = idGenerator();
        this.state={
            showResult: false,
            showUpIcon: true,
            value: ""
        }

    }

    showAndHide(){
        this.setState({
            showResult: !this.state.showResult,
            showUpIcon: !this.state.showUpIcon
        })
    }

    /* 
    * description : the method display message "copied" when we click on it
    * params : e (event)
    * return : void
    */

    getEmailTextOnClick(e) {
        e.preventDefault();
        var emailText = e.target.innerHTML;
        navigator.clipboard.writeText(emailText);

        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "Copied!";
        document.getElementById(e.currentTarget.id).className = "copiedElt";
    }

    /* 
    * description : the method display message "copy?" when we hover and email
    * params : e (event)
    * return : void
    */

    displayCopyText(e){
        var idOfElt = "copy" + e.currentTarget.id;
        
        document.getElementById(idOfElt).className = "copyMsg";
        document.getElementById(idOfElt).textContent = "Copy?";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";
        
    }

    /* 
    * description : the method erase message "copy?" when we mousse leave on it
    * params : e (event)
    * return : void
    */

    eraseCopyText(e){
        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";
        
    }

    render() {

        return (
            <div class="resultBlock my_resultBlock">
                <div class="quaterWidthDiv my_quaterWidthDiv"> </div>
                <div class="emailResult my_email_result">
                    <div class="email">
                        <p> <span class="foundEmailValue" onMouseLeave={this.eraseCopyText} onMouseMove={this.displayCopyText} onClick={this.getEmailTextOnClick} id={this.id}> {this.props.result.email}</span> <span className="copyMsg" id={"copy" + this.id} refs={"copy" + this.id}></span> </p>
                    </div>
                    <div class="source">
                        <p>
                         {this.props.result.url.length === 1 ?
                            <p>{this.props.result.url.length} source {this.state.showUpIcon ?
                                <i onClick={()=>this.showAndHide()}>{angleDown}</i>
                                : <i onClick={()=>this.showAndHide()}>{angleUp}</i> }
                            </p>
                            : <p>{this.props.result.url.length} sources {this.state.showUpIcon ?
                                <i onClick={()=>this.showAndHide()}>{angleDown}</i>
                                : <i onClick={()=>this.showAndHide()}>{angleUp}</i> }
                            </p>
                         }
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
                <div class="quaterWidthDiv"></div>
            </div>
        );
    }
}
