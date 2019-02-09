import React, { Component } from 'react';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SearchResults } from "./SearchResults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'


//import JsonFile from '../jsonFiles/itkamer.com.json';

//var JsonFile = require('../jsonFiles/itkamer.com.json')

const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="2x" spin/>
var jsonFilesInTheDirectory = ["itkamer.com.json", "cr7.com.json", "medievaltimes.com.json", "paness-iiht.com.json" ]

export class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAboutVisible: false,
            emails : [],
            isload : false,
            message :"",
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
            await this.showAndHide();
            this.state.isload = false;
            this.state.isAboutVisible = true;
            const devUrl = 'http://leadmehome.io/api/lead/testSharing';
            //const ProductionURL = 'api/lead/testSharing';
            try {
            
                // const res = await axios.post(devUrl, { url : this.state.message}) //await fetch(devUrl);
                
                /* This will browse on our cached files to see
                if the request has been done 
                once alredy */
                var returnedFile = this.returnJsonObject(this.state.message);
                if(returnedFile != 'undefined'){
                    var JsonFile = require("../jsonFiles/" + returnedFile);
                }
                const emails = JsonFile;

                //const emails = await res.json();
                // console.log(emails);
                this.setState({
                    emails
                });
                
            } catch (e) {
            console.log(e);
            }

            
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

    /*This functions browses the array containing the JSON files and 
    returns the one cprresponding to the user input  */
    returnJsonObject(userInput){ 
        for(var i=0; i<jsonFilesInTheDirectory.length; i++){
            var fileName = jsonFilesInTheDirectory[i].replace('.json', '');
            if(userInput == fileName) { //alert(jsonFilesInTheDirectory[i])
                return jsonFilesInTheDirectory[i];
                 
            }            
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
                            <div >
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
                     
                    { this.state.isAboutVisible ? <SearchResults emailList={this.state.emails ? this.state.emails : null}/> : null }
                </div>    
                <div className="notReadyDiv"> 
                    <p>
                        Not Ready to Get Started? <u> <a className="knowMoreLink" href="https://support.leadmehome.io/blog/"> Learn More </a> </u>{/*<!-- Link that sends to the Blog-->*/}
                    </p>
                </div>
                <ReactNotification types={[{
                    htmlClasses: ["notification-awesome"],
                    name: "awesome"
                }]} ref={this.notificationDOMRef} />
            </div>
        );
    }
}