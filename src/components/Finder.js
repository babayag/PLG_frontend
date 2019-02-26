import React, { Component } from 'react';
import { NavBar } from "./NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import MappleToolTip from 'reactjs-mappletooltip';
import ReactNotification from "react-notifications-component";

const search = <FontAwesomeIcon icon={faSearch} color="#333333" size="1x"/>
const valid = <FontAwesomeIcon icon={faCheck} color="#4EB92D"/>

export class Finder extends Component {
    constructor(props){
        super(props);

        this.state = {
            nameToFind: "",
            domainToFind: "",
            foundEmails: ["sales@itkamer.com" , "aaa@google.com", "dave@john@com", "solomon@gmail.com", "jeremiah@yahoo.com", "elijah@bing.fr"]
        }
        /*unless these, notification won't work */
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    /*When the value of an input changes, we directly set the state to the new value */
    handleChange = e => {  
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    /*This is run when we hit on the search button */
    searchTheseData(){
        var regEx = /\w+\.\w+/;
        if(this.state.nameToFind == "" || this.state.domainToFind == "" ){
            this.addNotification("One filed or both are empty");
        } 
        else if(!regEx.test(this.state.domainToFind)){
            this.addNotification("Please enter a domain name like 'medievaltimes.com'");
        }
        else{
            alert(this.state.nameToFind+'@'+this.state.domainToFind)
        }
    }

    /*Displays the notifications with the following chraracteristics */
    addNotification(message) {
        this.notificationDOMRef.current.addNotification({
            title: "Error",
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

    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if(e.keyCode === 13){
            this.searchTheseData()
        }
    }

    render() {
        return (
            <div className="finderContainer">
                <NavBar/>
                <div class="finder">
                  <div class="inner">
                    <div>
                      <h3>Emails Finder</h3>
                    </div>
                    <div class="inputs">
                      <input 
                        type="text" 
                        name="nameToFind"
                        onChange={this.handleChange} 
                        value={this.state.nameToFind} 
                        placeholder="John Doe" 
                        class="finder__name" 
                        onKeyDown={this._handleKeyPress}
                     />
                      <h4>@</h4>
                      <input type="text" 
                        name="domainToFind" 
                        value={this.state.domainToFind} 
                        onChange={this.handleChange} 
                        placeholder="company.com" 
                        class="finder__domain"
                        onKeyDown={this._handleKeyPress}
                      />
                      <button class="finder__btn" onClick={() => this.searchTheseData()}>{search}</button>
                    </div>
                    <p className="description">Enter a full name and the domain name of the email address (for example "leadmehome.io").</p>
                    <div className="foundEmailContainer">
                    {/* This displays all the emails */
                        (this.state.foundEmails).map(email => (
                            <p className="foundEmail">
                                {email}
                                <MappleToolTip className="mttipValidEmail" padding={'18px 12px 0px 12px'} shadow={true} float={true} direction={'right'} mappleType={'success'}>
                                <div>
                                    <span className="validIcon">{valid}</span>
                                </div>
                                <div>
                                    This Email is valid
                                </div>
                            </MappleToolTip>
                            </p>
                            )
                        )
                    } 
                    </div>
                  </div>
                </div>
                <ReactNotification types={[{
                    htmlClasses: ["notification-awesome"],
                    name: "awesome"
                }]} ref={this.notificationDOMRef} />
            </div>
        );
    }
}
