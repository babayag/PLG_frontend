import React, { Component } from 'react';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { SearchResults } from "./SearchResults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'


const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="2x" spin/>

export class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            isAboutVisible: false,
            emails : [],
            isload : false,
            message :"",
            foundJSONobject: '',  //the name of the JSON object corresponding to user input
            domainIsNew: false,  // if the user input matches nothing
            isSecfinished: false //if the second request 
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

    /*This method returns from the server an array with the names of all the JSON files
    and the picks out the one corresponding to the user input */
    async getDomainNames(userInput) {
        const devUrl = 'http://127.0.0.1:8000/api/lead/getDomains';
        try {
            const res = await axios.post(devUrl, { url : this.state.message}); 
 
            var domains = res.data.toString();
            domains = domains.slice(1,-2); 
            domains = domains.split(",");
            var domain;  
            for(var i=0; i<domains.length; i++){  
                var fileName = domains[i].replace('.json', '');
                if(userInput == fileName) { 
                    domain = domains[i];
                    // this.setState({
                    //     foundJSONobject: domain,
                    //     domainIsNew: true
                    // }) ;
                    return domain;                 
                }else{
                    // this.setState({
                    //     domainIsNew: false
                    // })
                }
            }         
            
        } catch (e) {
            console.log(e);
        }

    }
      
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
                const res = await axios.post(devUrl, { url : this.state.message}) //await fetch(devUrl);
                
                // const emails = await res.json();
                // alert(res.data.data); 
                // console.log(emails);


                /* This will browse on our cached files to see
                if the request has been done 
                once alredy */ 
                //var returnedFile = this.returnJsonObject(this.state.message);
                // alert(returnedFile);
                // if(returnedFile != 'undefined'){
                //     var JsonFile = require("../jsonFiles/" + returnedFile);
                // }
                // const emails = JsonFile;

                const emails = await res.data;
                console.log(emails);
                this.setState({
                    emails: emails
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
    /*returnJsonObject(userInput){ 
        var domain;
            for(var i=0; i<data.length; i++){
                var fileName = data[i].replace('.json', '');
                if(userInput == fileName) { //alert(jsonFilesInTheDirectory[i])
                    domain = data[i]; // alert(domain);
                    return domain;
                }            
            }
        return domain;
    }*/

    /*This Function reads the txt file that contains the names of 
    the domains that have been found already */
    readTextFile(file, callback){ 
        var rawFile = new XMLHttpRequest();
        var allText;
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function (){
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    allText = rawFile.responseText;
                    allText = allText.slice(0,-3)+"]";
                    // rawFile.send(allText);
                    callback(allText);
                    // alert(allText)
                    // rawFile.send("TTTTTTTT")
                    // return "allText";
                    // return "allText";

                }
            }
            
        }
        
        rawFile.send(null);
        // return allText;
        // return  rawFile.open("GET", file, false);
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