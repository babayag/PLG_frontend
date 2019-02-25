import React, { Component } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import ReactNotification from "react-notifications-component";
import {BrowserRouter , Route, Link} from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { SearchResults } from "./SearchResults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { SeeMoreButton } from "./SeeMoreButton";
import {ExportPage} from './ExportPage';



const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="2x" spin/>

export class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAboutVisible: false,
            emails : [],
            isload : false,
            message :"",
            latestSearch: "",
            valueOfp: 0,
            redirect: false,
            firstResults: []   /*this is used to send the value of the first results to
            the SeeMoreButton so that it will continue the search based on these results  */

        }
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "Error",
            message: "Please enter a domain name like 'medievaltimes.com' ",
            type: "awesome",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 3000 },
            dismissable: { click: true }
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    async findEmails() {
        var regEx = /\w+\.\w+/;
        if(!regEx.test(this.state.message)) {
            this.addNotification();
        }else{
            /*this resets the value of p so that it is 0 for each new research */
            this.setState({
                valueOfp: 0
            });


            await this.showAndHide();
            this.state.isload = false;
            this.state.isAboutVisible = true;
            const devUrl = 'http://leadmehome.io/api/lead/testSharing';
            const devUrlLocal = 'http://127.0.0.1:8000/api/lead/testSharing';
            //const ProductionURL = 'api/lead/testSharing';
            try {
                const res = await axios.post(devUrlLocal, { url : this.state.message, p:this.state.valueOfp}) //await fetch(devUrl);
                const emails = await res.data.data[0];
                const valueOfp = await res.data.data[1];
                console.log(valueOfp);
                this.setState({
                    emails: emails,
                    valueOfp : valueOfp,
                    firstResults: res.data.data /*set the value of the state*/
                });

                localStorage.setItem('domain',this.state.message);

            } catch (e) {
            console.log(e);
            }

            /*Sets the value of the lastest search to whar the user has entered */
            this.setState({
                latestSearch: this.state.message
            });
        }
    }

      showAndHide(){
        this.setState({
            isload : true,
            isAboutVisible : false
        })
    }
    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if(e.keyCode === 13){
            this.findEmails()
        }

    }

    render() {

        return (
            <div>

                <div className="searchBarBox">
                    <div className="quaterWidthDiv"> </div>
                    <div className="topnav">
                        <div className="search-container">

                            <input type="text"
                            name="message"
                            onChange={this.handleChange}
                            value={this.state.message}
                            placeholder="medievaltimes.com"
                            onKeyDown={this._handleKeyPress}
                            />
                            <div>
                                <button onClick={() => this.findEmails()} disabled={this.state.isload}><span>{ this.state.isload ? <span>{spinner}</span> :  <span>Get Email Addresses</span>  }</span></button>
                                {/* <button onClick={() => this.showAndHide()}>Find My Leads</button> */}
                            </div>
                        </div>

                        {/* <div class="searchBarIndication">
                            <p> Just enter a domain name and watch the magic happen! <br/>
                                For instance try google.com or medievaltimes.com
                            </p>
                        </div> */}
                    </div>
                    <div className="quaterWidthDiv">
                    </div>
                </div>
                <div className="appendedResultBlock">

                    { this.state.isAboutVisible ? <SearchResults firstResults={this.state.firstResults} requestedUrl={this.state.message} emailList={this.state.emails ? this.state.emails : null}/> : null }
                </div>
                <div className="notReadyDiv">
                    <p>
                        Not Ready to Get Started? <u> <a className="knowMoreLink" href="https://support.leadmehome.io/blog/"> Learn More </a> </u>{/*<!-- Link that sends to the Blog-->*/}
                    </p>
                </div>
                {/* <div>
                    <SeeMoreButton />
                </div> */}

                {/* <Route path="/export" render={() => <ExportPage name={"this.props.isload"}/>} />   */}

                <Route path="/export" component={ExportPage}/>

                <ReactNotification types={[{
                    htmlClasses: ["notification-awesome"],
                    name: "awesome"
                }]} ref={this.notificationDOMRef} />
            </div>
        );
    }
}
