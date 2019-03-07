import React, { Component } from 'react';
import axios from 'axios';
import { NavBarDashboard } from "./NavBarDashboard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import MappleToolTip from 'reactjs-mappletooltip';
import ReactNotification from "react-notifications-component";
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import stanley_img from '../dr_stanley.png';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

const search = <FontAwesomeIcon icon={faSearch} color="white" size="1x"/>
const valid = <FontAwesomeIcon icon={faCheck} color="#4EB92D"/>   //this is the green checked icon to testify that an email is valid
const spinner = <FontAwesomeIcon icon={faSpinner} color="#333333" size="2x" spin/>
const questionCirle = <FontAwesomeIcon icon={faQuestionCircle} color="#33313165" size="1x"/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>


export class DashboardFinder extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameToFind: "",
            domainToFind: "",
            isLoading: false, //has the search already stopped ??
            foundEmails: []
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
    async searchTheseData(){
        var name = this.state.nameToFind.trim();
        var regEx = /\w+\.\w+/;

        /*One filed or both are empty */
        if(name == "" || this.state.domainToFind == "" ){
            this.addNotification("One filed or both are empty");
        }
        /*Domain not matching */
        else if(!regEx.test(this.state.domainToFind)){
            this.addNotification("Please enter a domain name like 'medievaltimes.com'");
        }

        /*When more than two names to find are entered */
        else if(name.split(" ").length > 2){
            this.addNotification("Please enter one or two names")
        }

        /*When one or two names to find are entered and a correct domain too */
        else{
            const devUrl = 'http://leadmehome.io/api/lead/findervalidEmail';
            const devUrlLocal = 'http://127.0.0.1:8000/api/lead/findervalidEmail';

            /*When only one name to find was entered */
            if(name.split(" ").length == 1){
                await this.showAndHide(); /*To show the spinner */
                this.state.isLoading = false; /*Hide the spinner componnent when the search is finished */
                var splitedName = name.split(" "); /*split the entered name by removing the spaces*/
                var firstName = splitedName[0]; /*get the first element of the splitted array */
                var lastName = "";   /*get the second element of the splitted array */
                try {
                    /*Send an email with the three parameters */
                    const res = await axios.post(devUrl, { firstname:firstName, lastname:lastName, domain:this.state.domainToFind})
                    console.log(res.data);

                    var emailsThatWhereFound = res.data;

                    this.setState({
                        foundEmails: emailsThatWhereFound,
                    });

                } catch (e) {
                    console.log(e);
                }

            }
            else{
                await this.showAndHide();
                this.state.isLoading = false;
                var splitedName = name.split(" ");
                var firstName = splitedName[0];
                var lastName = splitedName[1];
                try {
                    const res = await axios.post(devUrl, {firstname:firstName, lastname:lastName, domain:this.state.domainToFind})
                    console.log(res.data);

                    var emailsThatWhereFound = res.data;

                    this.setState({
                        foundEmails: emailsThatWhereFound,
                    });

                } catch (e) {
                    console.log(e);
                }
            }
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

    showAndHide(){
        this.setState({
            isLoading : true,
        })
    }

    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if(e.keyCode === 13){
            this.searchTheseData()
        }
    }

    toggle = () => {
        const el = findDOMNode(this.refs.recent__search);
        $(el).slideToggle();
    }


    render() {
        return (
            <div className="finderContainer">
                <NavBarDashboard/>

                <div class="dashboard__content">
                    <div class="dashboard__content--left">
                        <div class="finder">
                            <div class="inner">
                                <div>
                                <h3>Emails Finder <span>{questionCirle}</span></h3>
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
                                <button class="finder__btn" disabled={this.state.isLoading} onClick={() => this.searchTheseData()}><span>{this.state.isLoading ? <span>{spinner}</span> :  <span>{search}</span>}</span></button>
                                </div>
                                <p className="description">Enter a full name and the domain name of the email address (for example "itkamer.com").</p>
                                {/* <p className="mt-3" id="training__post_id">LEARN HOW TO <b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK.</a></b></p> */}
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
                    </div>

                    <div class="dashboard__content--right">
                        <div class="recent__search">
                        <h3>Recents Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                        </div>

                        <div class="recent__searchs" ref="recent__search">
                        <h3>Recents</h3>
                        </div>

                        <div class="coldemail__title"><h3><span>LEARN HOW TO </span><b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK</a></b></h3></div>
                        <div class="video__course">
                        {/* <video width="100%" height="100%" controls poster={stanley_img}>
                            <source src="movie.mp4" type="video/mp4" />
                        </video> */}
                        <a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">
                            <img src={stanley_img} />
                        </a>
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
