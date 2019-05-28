/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import stanley_img from '../img/dr_stanley.png';
import MappleToolTip from 'reactjs-mappletooltip';
import ReactNotification from "react-notifications-component";
import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import {searchTheseDatas, searchMores, checkFacebookAndGooglePixels} from '../../../services/Api/leadService';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x" />
const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin />
const smallerSpinner = <FontAwesomeIcon icon={faSpinner} color="#fff" size="2x" spin />
const smallerSpinnerViolet = <FontAwesomeIcon icon={faSpinner} color="#212529" size="1x" spin />
const valid = <FontAwesomeIcon icon={faCheck} color="#4EB92D"/> 
const invalid = <FontAwesomeIcon icon={faTimes} color="#FF0515"/> 

export class Lead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            niche: "",
            location: "",
            isLoading: false, //has the search already stopped ??
            isSearchingMore: false, // is it still searching more leads?
            foundEmails: [],
            shouldWeDisplayTable: false,
            remainingEmails: [],
            isShowmore: false,
            p:0

        }
        /*unless these, notification won't work */
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
        this.searchMore = this.searchMore.bind(this);
    }

    toggle = () => {
        const el = findDOMNode(this.refs.recent__search);
        $(el).slideToggle();
    }

    /***
     * description: When the value of an input changes, we directly set the state to the new value 
     * params: e (event)
     * return: void
     */
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
        /***
         * description: When the user presses a key 
         * params: e (event)
         * return: void
         */
    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if (e.keyCode === 13) {
            this.searchTheseData()
        }
    }
        /***
         * description: triggers the state that shows and hide spinner when searching emails
         * params: void
         * return: void
         */
    showAndHide() {
        this.setState({
            isLoading: true
        })
    }
         /***
         * description: triggers the state that shows and hide spinner when searching more emails
         * params: void
         * return: void
         */
    showAndHideSearchMore() {
        this.setState({
            isSearchingMore: true
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
        /***
         * description: calls searchTheseDatas service and displays returned emails
         * params: void
         * return: void
         */
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
           
                await searchTheseDatas(this.state.niche.toLowerCase(), this.state.location.toLowerCase(),this.state.p).then(data => {
                   

                    if (data.data.length !== 0) {
                        var emailsThatWhereFound = data.data.Results;
    
                        var finalFoundEmails = [];
                        if (emailsThatWhereFound.length !== 0) {
                            for (var i = 0; i < emailsThatWhereFound.length; i++) {
                               
                                finalFoundEmails.push(emailsThatWhereFound[i]);
                            }
                        } else {
                            finalFoundEmails = []
                        }
    
    
                        // Sort Email list by number of emails
                        var sortedEmails = this.sortEmails(finalFoundEmails);
    
                        this.setState({
                            remainingEmails: sortedEmails,
                            foundEmails: sortedEmails,
                            shouldWeDisplayTable: true,
                        });
    
                        if(finalFoundEmails.length >= 10){
                            this.setState({
                                isShowmore: true,
                                p:10 
                            })
                        }
    
                        this.checkFacebookAndGooglePixel(this.state.foundEmails)
    
    
                    } else {
                        this.setState({
                            shouldWeDisplayTable: true
                        });
                    }
                       
                        
                     }).catch( err =>{
                         console.log(err)
                            this.setState({
                                isLoading: false,
                            });
            
                            this.addNotification("An error occured", "Please refresh the page and try again.");
                     })             
             
                
        }

    }

    /***
     * description: verifies if and object is empty
     * params: oject to verify
     * return: boolean (true if the object is empty and false if not)
     */
    isEmpty(obj) {  //test if an object is empty or not
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /***
     * description: copy element we clicked on
     * params: e (event)
     * return: bool
     */
    getEmailTextOnClick(e) {
        e.preventDefault();
        var emailText = e.target.innerHTML;
        navigator.clipboard.writeText(emailText);

        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "Copied!";
        document.getElementById(e.currentTarget.id).className = "copiedElt";
    }

    /***
     * description: display "Copy?"" when a user hovers an email
     * params: e (event)
     * return: void
     */
    displayCopyText(e) {
        var idOfElt = "copy" + e.currentTarget.id;

        document.getElementById(idOfElt).className = "copyMsg";
        document.getElementById(idOfElt).textContent = "Copy?";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";

    }

    /***
     * description: removes the displayed "Copy?" when user ends hovering an email
     * params: e (event)
     * return: void
     */
    eraseCopyText(e) {
        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";

    }

    /***
     * description: This function takes email and sources list, generate the csv file to download
     * params: data : the data that will be writen in the CSV file
     * return: void
     */
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


    /***
     * description: This function sorts a list of domains basing on numbers of email per domains
     * params: data : the domains list (with their emails) that will be sorted
     * return: void
     */
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

    /***
     * description: This function recalls searchTheseDatas service precising the current number of pages
     * params: void
     * return: void
     */
    searchMore = async() => {
        await this.showAndHideSearchMore(); /*To show the spinner */
        this.state.isSearchingMore = false; /*Hide the spinner componnent when the search is finished */

        try {
            let niche = this.state.niche.toLowerCase()
            let location = this.state.location.toLowerCase()
            
            await searchTheseDatas(niche, location, this.state.p).then(data => {
                if (data.data.length !== 0) {
                    var emailsThatWhereFound = data.data.Results;
                        
                    var finalFoundEmails = [];
                    if (emailsThatWhereFound.length !== 0) {
                        for (var i = 0; i < emailsThatWhereFound.length; i++) {
                            finalFoundEmails.push(emailsThatWhereFound[i]);
                        }
                        var emails = this.state.foundEmails.concat(finalFoundEmails);
                        this.setState({
                            foundEmails: this.sortEmails(emails)
                        })
                        
                        console.log(data)
                        this.checkFacebookAndGooglePixel(this.state.foundEmails) 
                        
                            
    
                        if(finalFoundEmails.length >= 10){
                            this.setState({
                                isShowmore: true,
                                p: this.state.p + 10
                            })
                        }else{
                            this.setState({
                                isShowmore: false
                            })
                        }
    
                    } else { //no more lead
                        finalFoundEmails = this.state.finalFoundEmails
                    }
                }

            })
            
           
        } catch (e) {
            console.log(e);
            this.setState({
                isLoading: false,
            });

            this.addNotification("An error occured", "Please refresh the page and try again.");
        }
    } 

    // 
    /***
     * description: this method calls checkFacebookAndGooglePixels service for each domain to check FB and Google pixels
     * params: foundEmails : List os domains to check
     * return: void
     */
    checkFacebookAndGooglePixel = async(foundEmails) => {

        this.setState({
            isSearchingMore: true   
        })
        for(var i=0; i<foundEmails.length; i++){
            //I create an instance of the state foundEmais that I will use to set the checking value
            var foundEmailsInstance = this.state.foundEmails;
            try {
                if(foundEmails[i].hasFacebookPixel == "pending"){

                    await checkFacebookAndGooglePixels({ domain: foundEmails[i].Domain }).then(data => {

                    //In my FoundEmalsInstance, I assign the values of the two variables I was checking

                        foundEmailsInstance[i].hasFacebookPixel = data.data.hasFacebookPixel;
                        foundEmailsInstance[i].hasGooglePixel = data.data.hasGooglePixel;
                      
                    //I update the state so that it displays the results on the table
                    this.setState({
                        foundEmails: foundEmailsInstance
                    })

                    })
                    
                }
               
            } catch (e) {
            console.log(e);
            
            }
            
        }
        this.setState({
            isSearchingMore: false   
        })
    }


    render() {
        var showmore;
        if(this.state.isShowmore){
            showmore = (
                <div id="shomorelead" className="emailResult seeMoreBtnParentFirstChild seemorebtn">
                    <button onClick={this.searchMore} disabled={this.state.isSearchingMore}>{this.state.isSearchingMore ? <span>Please wait... {smallerSpinnerViolet}</span> : <span>Show more</span>}</button>
                    
                </div>
            )
        }else{
            showmore = null;
        }

        return (
            <div class="dashboard__page">
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
                                            <span className="d-flex -flex-row justify-content-center align-items-center" id="lead__export">
                                                {this.state.foundEmails.length == 1 ?
                                                    <p className="lead__results_num">We found {this.state.foundEmails.length} Bussiness.</p> :
                                                    <p className="lead__results_num">We found {this.state.foundEmails.length} Bussinesses.</p>
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
                                                        <th scope="col" className="table__col--3">
                                                            <MappleToolTip className="mttipValidEmail" padding={'8px 12px 8px 12px'} shadow={false} float={true} direction={'top'} mappleType={'light'}>
                                                                <div>
                                                                    <span className="validIcon">FP</span>
                                                                </div>
                                                                <div>
                                                                    This website uses Facebook Pixel
                                                                </div>
                                                            </MappleToolTip>
                                                        </th>
                                                        <th scope="col" className="table__col--3">
                                                            <MappleToolTip className="mttipValidEmail" padding={'8px 12px 8px 12px'} shadow={false} float={true} direction={'top'} mappleType={'light'}>
                                                                <div>
                                                                    <span className="validIcon">GA</span>
                                                                </div>
                                                                <div>
                                                                    This website uses Google Analytics
                                                                </div>
                                                            </MappleToolTip></th>
                                                        <th scope="col" className="table__col--2">Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.foundEmails.map((item, i) =>
                                                        <tr>
                                                            <th scope="row">{this.state.foundEmails.indexOf(item) + 1}</th>  {/*This is the number of the row in the left side of each row*/}
                                                            <td className="email">{item.Domain}</td>
                                                            <td>{item.hasFacebookPixel == "pending" ? 
                                                                smallerSpinnerViolet :
                                                                item.hasFacebookPixel ? 
                                                                    valid : invalid 
                                                                }
                                                            </td>
                                                            <td>{item.hasGooglePixel == "pending" ? 
                                                                smallerSpinnerViolet :
                                                                item.hasGooglePixel ? 
                                                                    valid : invalid 
                                                                }
                                                            </td>
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
                            {/* <div class="recent__search">
                                <h3>Saved Search</h3> <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                            </div> */}

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

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Lead);