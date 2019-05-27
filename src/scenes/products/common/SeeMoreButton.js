import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";
import {EmailResult} from './EmailResult';
import {findEmails} from '../../../services/Api/searchEmailService'




export class SeeMoreButton extends Component {
    constructor(props){
        super(props)
        this.state={
            requestedUrl: this.props.requestedUrl,
            firstResults: this.props.firstResults,
            newResults: [],
            isloading: false,
            valueOfp: this.props.firstResults[1],
            hideShowMore: false
        }
        /*Without these, notification won't work */
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    /* 
    * description : the method run the request for searching new email 
    * params : 
    * return : void
    */
    async findNewEmails() {
       
        this.setState({
            isloading: true
        });

        await findEmails(this.state.requestedUrl, this.state.valueOfp).then(data => {
            console.log(data.data)
                this.setState({
                    newResults: this.state.newResults.concat(data.data[0]),
                    valueOfp : data.data[1],
                    hideShowMore : data.data[2]
                });
                this.props.updateEmails(data.data[0])
             })
       
            this.setState({
                isloading: false
            });
            if(!this.state.hideShowMore){
                this.setState({
                    hideShowMore: true
                });
            }

        
            this.setState({
                isloading: false
            });
            this.addNotification("An error occured", "Please try again.")

    }

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

        return (
            <div className="newResults">

                <div className="theResults seeMoreBtnParent the moreresult">
                    <div className="quaterWidthDiv"> </div>
                    <div className="emailResult seeMoreBtnParentFirstChild seemorebtn">

                        <p>
                        {/* <div className="theResults">  */}
                            {this.state.hideShowMore ?

                                <h4>All emails have been found </h4>
                                :
                                <div>

                                    <button onClick={() => this.findNewEmails()} disabled={this.state.isloading}>
                                        {this.state.isloading?
                                            <span>Searching...</span>
                                            :<span>Show more</span>
                                        }

                                    </button>
                                </div>

                            }
                        </p>

                    </div>

                    {/* </div> */}
                </div>
                <div className="quaterWidthDiv"> </div>

                <ReactNotification 
                    types={[{
                        htmlClasses: ["notification-awesome"],
                        name: "awesome"
                    }]} 
                    ref={this.notificationDOMRef} 
                    style="text-align:left !important"
                />
            </div>    
        );
    }
}
