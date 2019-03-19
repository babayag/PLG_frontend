/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { NavBar } from './NavBar';
import stanley_img from '../dr_stanley.png';
import ReactNotification from "react-notifications-component";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x" />
const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin />
const smallerSpinner = <FontAwesomeIcon icon={faSpinner} color="#fff" size="2x" spin />

export class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            niche: "",
            location: "",
            isLoading: false, //has the search already stopped ??
            foundEmails: [],
            shouldWeDisplayTable: false,
            remainingEmails: [],
            isShowmore: false

        }
        /*unless these, notification won't work */
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.displayResults = this.displayResults.bind(this);
    }

    toggle = () => {
        const el = findDOMNode(this.refs.recent__search);
        $(el).slideToggle();
    }

    /*When the value of an input changes, we directly set the state to the new value */
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if (e.keyCode === 13) {
            this.searchTheseData()
        }
    }

    showAndHide() {
        this.setState({
            isLoading: true,
        })
    }

    /*Displays the notifications with the following chraracteristics */
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

    /*This is run when we hit on the search button */
    async searchTheseData() {
        this.setState({
            shouldWeDisplayTable: false,
            foundEmails: []
        });
        /*One filed or both are empty */
        if (this.state.niche == "" || this.state.location == "") {
            this.addNotification("Error", "One field or both are empty");
        }
        else {
            await this.showAndHide(); /*To show the spinner */
            this.state.isLoading = false; /*Hide the spinner componnent when the search is finished */
            const devUrl = '/api/lead/betterfindlead';
            const devUrlLocal = 'http://127.0.0.1:8000/api/lead/betterfindlead';

            try {
                const res = await axios.post(devUrl, { niche: this.state.niche, city: this.state.location })

                if (res.data.data.length !== 0) {
                    var emailsThatWhereFound = res.data.data[0].Results;

                    var finalFoundEmails = [];
                    if (emailsThatWhereFound.length !== 0) {
                        for (var i = 0; i < emailsThatWhereFound.length; i++) {
                            // console.log(emailsThatWhereFound[i].Domain);
                            finalFoundEmails.push(emailsThatWhereFound[i]);
                        }
                    } else {
                        finalFoundEmails = []
                    }

                    // Sort Email list by number of emails
                    var readyToState = this.sortEmails(finalFoundEmails);

                    this.setState({
                        remainingEmails: readyToState
                    });

                    this.displayResults();

                } else {
                    this.setState({
                        // foundEmails: [],
                        shouldWeDisplayTable: true
                    });
                }


                // console.log(this.state.foundEmails);

            } catch (e) {
                console.log(e);
                this.setState({
                    isLoading: false,
                });

                this.addNotification("An error occured", "Please refresh the page and try again.");
            }
        }

    }

    isEmpty(obj) {  //test if an object is empty or not
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    getEmailTextOnClick(e) {
        e.preventDefault();
        var emailText = e.target.innerHTML;
        navigator.clipboard.writeText(emailText);

        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "Copied!";
        document.getElementById(e.currentTarget.id).className = "copiedElt";
    }

    displayCopyText(e) {
        var idOfElt = "copy" + e.currentTarget.id;

        document.getElementById(idOfElt).className = "copyMsg";
        document.getElementById(idOfElt).textContent = "Copy?";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";

    }

    eraseCopyText(e) {
        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";

    }

    // This function take email and sources list, generate the csv file to download
    generateCSV = (data) => {
        let csvContent = "data:text/csv;charset=utf-8,";
        // Format our csv file content
        csvContent += "domain , emails" + "\r\n";
        data.forEach(function (rowArray) {
            let row = rowArray.Domain + " , " + rowArray.Emails.join(",");
            csvContent += row + "\r\n";
        });

        // Creating the file
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        let fileName = this.state.niche + "_" + this.state.location;
        link.setAttribute("download", fileName+".csv");
        link.click();
    }

    // This function sort it basing on numbers of email per domains
    sortEmails = (emailList) => {
        let sortedEmailList = [...emailList];
        for (var i = 0; i < sortedEmailList.length; i++) {
            var len1 = sortedEmailList[i].Emails.length; // Length of each email domain table
            for (var j = 0; j < sortedEmailList.length; j++) {
                var len2 = sortedEmailList[j].Emails.length; // Length of each email domain table
                if (len1 <len2) {
                    let cache = sortedEmailList[i];
                    sortedEmailList[i] = sortedEmailList[j];
                    sortedEmailList[j] = cache;
                }
            }
            
        }
        sortedEmailList.reverse();
        return sortedEmailList;
    }

    displayResults = () => {
        let prevRemainingEmails = [...this.state.remainingEmails];
        let nPrev = prevRemainingEmails.length;

        let emailsToDisplay = [...this.state.foundEmails];

        if (nPrev > 10){
            // If there are more than ten emails
            emailsToDisplay = emailsToDisplay.concat(prevRemainingEmails.slice(0, 10));
            let newRemainingEmails = prevRemainingEmails.slice(10);

            this.setState({ 
                foundEmails: emailsToDisplay,
                shouldWeDisplayTable: true, 
                remainingEmails: newRemainingEmails, 
                isShowmore: true 
            });
        }else{
            emailsToDisplay = emailsToDisplay.concat(prevRemainingEmails);
            this.setState({
                foundEmails: emailsToDisplay,
                shouldWeDisplayTable: true,  
                remainingEmails: [],
                isShowmore: false 
            });
        }
    }


    render() {
        var showmore;
        if(this.state.isShowmore){
            showmore = (
                <div id="shomorelead" className="emailResult seeMoreBtnParentFirstChild seemorebtn">
                    <button onClick={this.displayResults}>Show more</button>
                </div>
            )
        }else{
            showmore = null;
        }

        return (
            <div class="dashboard__page">
                <NavBar />
                <div class="lead__dashboard mb-5">
                    <div class="lead__dashboard__content pb-5">
                        <div class="lead__dashboard--left">
                            <div class="inputs mb-5">
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter Location"
                                    className="finder__name mr-2"
                                    onChange={this.handleChange}
                                    value={this.state.location}
                                    onKeyDown={this._handleKeyPress}
                                />
                                <input
                                    type="text"
                                    name="niche"
                                    placeholder="Enter Niche"
                                    className="finder__domain"
                                    onChange={this.handleChange}
                                    value={this.state.niche}
                                    onKeyDown={this._handleKeyPress}
                                />
                                <button class="finder__btn dashboard_finder__btn" disabled={this.state.isLoading} onClick={() => this.searchTheseData()}><span>{this.state.isLoading ? <span>{smallerSpinner}</span> : <span>SEARCH</span>}</span></button>
                            </div>

                            {this.state.shouldWeDisplayTable ?  //can hide the whole table
                                <div>
                                    <div className="titleOfTheInfo">
                                        {this.state.foundEmails.length > 0 ? // all this logic is to determine if we should write plural or singular results title
                                            <span className="d-flex -flex-row justify-content-center">
                                                {this.state.foundEmails.length == 1 ?
                                                    <p>We found {this.state.foundEmails.length} Bussiness.</p> :
                                                    <p>We found {this.state.foundEmails.length} Bussinesses.</p>
                                                }
                                                <button className="exportBtn" onClick={this.generateCSV.bind(this, this.state.foundEmails)}>Export <span className="numberInExportBtn">{this.state.foundEmails.length}</span></button>
                                            </span>:
                                            <p>We found nothing.</p>
                                        }
                                    </div>

                                    {/* <span>Table of results</span> */}
                                    {this.state.foundEmails.length !== 0 ? //do we display the table? better, are there results?
                                        <div>
                                            <table class="table dashboard__finder__results mt-5">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col" className="table__col--1">Business</th>
                                                        <th scope="col" className="table__col--2">Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.foundEmails.map((item, i) =>
                                                        <tr>
                                                            <th scope="row">{this.state.foundEmails.indexOf(item) + 1}</th>  {/*This is the number of the row in the left side of each row*/}
                                                            <td>{item.Domain}</td>
                                                            <td>
                                                                <div id={"accordion" + this.state.foundEmails.indexOf(item)} className="my-2 mr-3">
                                                                    {
                                                                        item.Emails.length !== 0 ?
                                                                        <div class="card">
                                                                            <div class="card-header d-flex align-items-center" id="headingOne" data-toggle="collapse" data-target={"#collapseOne" + this.state.foundEmails.indexOf(item)} aria-expanded="true" aria-controls="collapseOne">
                                                                                <h4 class="mb-0 mr-auto">Show Emails </h4> <h4>{chevronDown}</h4>
                                                                            </div>

                                                                            <div id={"collapseOne" + this.state.foundEmails.indexOf(item)} class="collapse " aria-labelledby="headingOne" data-parent={"#accordion" + this.state.foundEmails.indexOf(item)}>
                                                                                <div class="card-body">
                                                                                    {item.Emails.map((email, id) =>
                                                                                        <div>
                                                                                            <span class="foundEmailValue" onMouseLeave={this.eraseCopyText} onMouseMove={this.displayCopyText} onClick={this.getEmailTextOnClick} id={(i+"_"+id)}>
                                                                                            {email}</span>
                                                                                            <span className="copyMsg" id={"copy" + (i + "_" + id)} refs={"copy" + (i + "_" +id)}></span>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>:
                                                                        <span>No Emails Found.</span>
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            {showmore} 
                                        </div>:
                                        null
                                    }
                                </div> :
                                <span>
                                    {this.state.isLoading ?
                                        <div className="titleOfTheInfo">
                                            <p>Wait while we find your Leads...</p>
                                            <span>{spinner}</span>
                                        </div> :
                                        null
                                    }

                                </span>


                            }
                        </div>

                        {/* <span>Left Side</span> */}
                        <div class="lead__dashboard--right">
                            <div class="recent__search">
                                <h3>Saved Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                            </div>

                            <div class="recent__searchs" ref="recent__search">
                                ...
                        </div>
                            <div class="coldemail__title"><h3><span>LEARN HOW TO </span><b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK</a></b></h3></div>
                            <div class="video__course">
                                <a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">
                                    <img src={stanley_img} />
                                </a>
                            </div>
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