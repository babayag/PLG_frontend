import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import ReactNotification from "react-notifications-component";
import { Route } from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { SearchResults } from "./SearchResults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ExportPage} from './ExportPage';
import {fetchSearchEmail} from '../../actions/searchEmail/searchEmail';
import {connect} from "react-redux";
const cookies = new Cookies();

//cookies.set('numberOfSearches', 0, { path: '/' });
// console.log(cookies.get('numberOfSearches')); // Pacman

const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="2x" spin/>

/*We set the value of this cookie so that it will be incremented
 everytime somebody does a research, thus it will escape
 the notificaton validation */
 cookies.set('numberOfSearches', 0, { path: '/' });

 class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            isload : false,
            p: this.props.searchBarState.valueOfp,
            userEntry :"",
            latestSearch: "",
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

    /* 
    * description : the method send the request to find emails on a domain 
    * params : 
    * return : void
    */
    async findEmails() {
        var regEx = /\w+\.\w+/;
        
        
        if(!regEx.test(this.state.userEntry)) {
            this.addNotification("Error", "Please enter a domain name like 'medievaltimes.com'");
        }
        
        else{

            // await this.showAndHide();
            // this.state.isload = false;
            // this.state.isAboutVisible = true;
            
            
            await this.props.fetchSearchEmails(this.state.userEntry, 0);
            // console.log(this.props.searchBarState);
            // console.log(this.props.searchBarState.valueOfp);
            // console.log(this.state.userEntry);
            // console.log(this.props.searchBarState);
            //  console.log(this.props.searchBarState.isAboutVisible);
            // await findEmails(this.state.userEntry, this.state.valueOfp).then(data => {
            //     this.setState({
            //         emails: data.data[0],
            //         valueOfp :  data.data[1],
            //         firstResults: data.data, /*set the value of the state*/
            //         // numberOfSearches: newNumberOfSearches
            //     });

            //     localStorage.setItem('domain', this.state.userEntry);
                
                
            //     this.setState({
            //         isload : false,
            //     });
            // }).catch(err => {
            //     console.log(err);
            //     this.addNotification("An error occured", "Please refresh the page and try again.")
            // })
            
            

            /*Sets the value of the lastest search to whar the user has entered */
            this.setState({
                latestSearch: this.state.userEntry
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
        return(
            <div>

                <div className="searchBarBox">
                    <div className="quaterWidthDiv"> </div>
                    <div className="topnav">
                        <div className="search-container">

                            <input type="text"
                            name="userEntry"
                            onChange={this.handleChange}
                            value={this.state.userEntry}
                            placeholder="medievaltimes.com"
                            onKeyDown={this._handleKeyPress}
                            />
                            <div>
                                <button onClick={() => this.findEmails()} disabled={this.props.searchBarState.isload}><span>{ this.props.searchBarState.isload ? <span>{spinner}</span> :  <span>Get Email Addresses</span>  }</span></button>
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

                    { this.props.searchBarState.isAboutVisible ? <SearchResults url={this.state.userEntry} p={this.props} globalState={this.props.searchBarState} firstResults={this.props.searchBarState.emails} emailList={ this.props.searchBarState.emails ? this.props.searchBarState.emails: null}/> : null }
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

const mapStateToProps = state => {
    console.log(state.toggleSearchEmail);
    return {
      searchBarState: state.toggleSearchEmail,
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      fetchSearchEmails: (url,p) => {
        dispatch(fetchSearchEmail(url,p));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);