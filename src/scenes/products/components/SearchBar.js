import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import ReactNotification from "react-notifications-component";
import {BrowserRouter , Route, Link} from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { SearchResults } from "./SearchResults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ExportPage} from './ExportPage';
import {findEmails} from '../../../services/Api/searchEmailService'

const cookies = new Cookies();

//cookies.set('numberOfSearches', 0, { path: '/' });
// console.log(cookies.get('numberOfSearches')); // Pacman

const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="2x" spin/>

/*We set the value of this cookie so that it will be incremented
 everytime somebody does a research, thus it will escape
 the notificaton validation */
 cookies.set('numberOfSearches', 0, { path: '/' });

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
            firstResults: [],   /*this is used to send the value of the first results to
            the SeeMoreButton so that it will continue the search based on these results  */
            numberOfSearches: cookies.get('numberOfSearches')

        }
        /*without these, notification won't work */
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
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
            this.addNotification("Error", "Please enter a domain name like 'medievaltimes.com'");
        }
        // else if(this.state.numberOfSearches == 1){
        //     this.addNotification("Error", "You need to Login to do more researches.")
        // }
        else{
            /*this resets the value of p so that it is 0 for each new research */
            this.setState({
                valueOfp: 0
            });

            await this.showAndHide();
            this.state.isload = false;
            this.state.isAboutVisible = true;
            
            await findEmails(this.state.message, this.state.valueOfp).then(data => {
             console.log(data.data)
                this.setState({
                    emails: data.data[0],
                    valueOfp :  data.data[1],
                    firstResults: data.data, /*set the value of the state*/
                    // numberOfSearches: newNumberOfSearches
                });

              })
              console.log(this.state.emails)
                
                
               
                //cookies.set('numberOfSearches', parseInt(cookies.get('numberOfSearches'))+1, { path: '/' }); /*sets the value of the cookie to 1 so that user will need to login to do more researches */
                //const newNumberOfSearches = cookies.get('numberOfSearches');
                //console.log(valueOfp);
                // this.setState({
                //     emails: emails,
                //     valueOfp : valueOfp,
                //     firstResults: res.data.data, /*set the value of the state*/
                //     numberOfSearches: newNumberOfSearches
                // });
             

                this.setState({
                    isload : false,
                });

                this.addNotification("An error occured", "Please refresh the page and try again.");

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
