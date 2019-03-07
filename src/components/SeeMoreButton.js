import React, { Component } from 'react';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import {EmailResult} from './EmailResult';




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

    async findNewEmails() {
        // await this.showAndHide();
        // this.state.isloading = false;
        // this.state.isAboutVisible = true;
        const devUrl = '/api/lead/testSharing';
        const devUrlLocal = 'http://127.0.0.1:8000/api/lead/testSharing';
        //const ProductionURL = 'api/lead/testSharing'; 
        try {
            this.setState({
                isloading: true
            });
            
            const res = await axios.post(devUrl, { url : this.state.requestedUrl, p:this.state.valueOfp}) //await fetch(devUrl);
            const emails = await res.data.data[0];
            const valueOfp = await res.data.data[1];
            var hideShowMore = await res.data.data[2];

            /*this will update the value of emails in the parent of this component */
            this.props.updateEmails(emails) 
            console.log(res.data);
            this.setState({
                newResults: this.state.newResults.concat(emails),
                valueOfp : valueOfp 
            });
            
            this.setState({
                isloading: false
            });
            if(!hideShowMore){
                this.setState({
                    hideShowMore: true
                });
            }
            
        } catch (e) {
            console.log(e);
            this.setState({
                isloading: false
            });
            this.addNotification("An error occured", "Please try again.")
        }

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
                
                {/* This displays all the new results */
                    /*    (this.state.newResults).map(item => (
                            <div className="theResults"> 
                                <p> <EmailResult result= {item}/></p>
                            </div> 
                        ))
                    */  
                }  
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
