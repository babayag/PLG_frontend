/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import stanley_img from '../users/images/dr_stanley.png';
import MappleToolTip from 'reactjs-mappletooltip';
import ReactNotification from "react-notifications-component";
import { faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Forfait from "../../products/users/components/Forfait";
import {BetterFinders} from '../../../services/Api/leadService';
import {makePayments} from '../../../services/Api/paymentService';
import {getRestOfUserRequests, checkFacebookAndGooglePixels} from '../../../services/Api/leadService';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>
const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>
const smallerSpinner = <FontAwesomeIcon icon={faSpinner} color="#fff" size="2x" spin/>
const smallerSpinnerViolet = <FontAwesomeIcon icon={faSpinner} color="#212529" size="1x" spin />
const valid = <FontAwesomeIcon icon={faCheck} color="#4EB92D"/> 
const invalid = <FontAwesomeIcon icon={faTimes} color="#FF0515"/> 

class DashboardLead extends Component {

    constructor(props){
        super(props);
        this.state = {
            niche: "",
            location: "",
            isLoading: false, //has the search already stopped ??
            isSearchingMore: false, // is it still searching more leads??
            foundEmails: [],
            shouldWeDisplayTable: false,
            isShowmore: false,
            p:0,
            isPayamentLoading : false,
            request:"",
            forfaitFinished:'',
            restRequestIsLoad: false,
            
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

    /*When the value of an input changes, we directly set the state to the new value */
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    _handleKeyPress = e => { // When user presses on a keyboardtouch
        if(e.keyCode === 13){
            this.searchTheseData()
        }
    }

    showAndHide(){
        this.setState({
            isLoading : true,
        })
    }

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

    /* 
    * description : the method reload the number of request
    * params : 
    * return : void
    */
    componentDidMount() {

        try {
             getRestOfUserRequests(this.props.user.email ).then(data => {
                    this.setState({
                        request : data,
                        restRequestIsLoad: true
                    })
            })

        } catch (e) {
            console.log(e)
        }
    }
    
    /* 
    * description : the method send request for getting domain and emails on it for a particular niche and location
    * params : 
    * return : void
    */
    async searchTheseData(){
        this.setState({
            shouldWeDisplayTable: false,
            foundEmails: []
        });
        /*One filed or both are empty */
        if(this.state.niche == "" || this.state.location == ""){
            this.addNotification("Error", "One field or both are empty");
        }
        else{
            await this.showAndHide(); /*To show the spinner */
            this.state.isLoading = false; /*Hide the spinner componnent when the search is finished */

            try {
                let niche = this.state.niche.toLowerCase()
                let location = this.state.location.toLowerCase()

                await BetterFinders(niche, location, this.props.user.email, this.state.p ).then(data => {

                    if (typeof(data) == "string")
                {
                    this.setState({
                        forfaitFinished : data
                    })
                }
                if(data.data.length !== 0){
                    var emailsThatWhereFound = data.data.Results;
    
                    var finalFoundEmails = [];
                    if (emailsThatWhereFound.length != 0){
                        for(var i=0; i<emailsThatWhereFound.length; i++){
                            finalFoundEmails.push(emailsThatWhereFound[i]);
                        }
                    }else {
                        finalFoundEmails = []
                    }
                        // Sort Email list by number of emails
                    var sortEmails = this.sortEmails(finalFoundEmails);

                    this.setState({
                        remainingEmails: sortEmails,
                        foundEmails: sortEmails,
                        shouldWeDisplayTable: true,
                    });

                    if(finalFoundEmails.length >= 10){
                        this.setState({
                            isShowmore: true,
                            p:10 
                        })
                    }

                    this.checkFacebookAndGooglePixel(this.state.foundEmails);

                }else{
                    this.setState({
                        // foundEmails: [],
                        shouldWeDisplayTable: true
                    });
                }

                })


                // console.log(this.state.foundEmails);

            } catch (e) {
                console.log(e);
                this.setState({
                    isLoading : false,
                });

                this.addNotification("An error occured", "Please refresh the page and try again.");
            }
        }

    }

    isEmpty(obj) {  //test if an object is empty or not
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    /* 
    * description : the method display message "copied" when we click on it
    * params : e (event)
    * return : void
    */

    getEmailTextOnClick(e) {
        e.preventDefault();
        var emailText = e.target.innerHTML;
        navigator.clipboard.writeText(emailText);

        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "Copied!";
        document.getElementById(e.currentTarget.id).className = "copiedElt";
    }

    /* 
    * description : the method display message "copy?" when we mousse leave on it
    * params : e (event)
    * return : void
    */
    displayCopyText(e) {
        var idOfElt = "copy" + e.currentTarget.id;

        document.getElementById(idOfElt).className = "copyMsg";
        document.getElementById(idOfElt).textContent = "Copy?";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";

    }

    /* 
    * description : the method erase message "copy?" when we mousse leave on it
    * params : e (event)
    * return : void
    */
    eraseCopyText(e) {
        var idOfElt = "copy" + e.currentTarget.id;
        document.getElementById(idOfElt).textContent = "";
        document.getElementById(e.currentTarget.id).className = "foundEmailValue";

    }

    /* 
    * description : the method generate csv for data params
    * params : data
    * return : void
    */
    generateCSV = (data) => {
        let csvContent = "data:text/csv;charset=utf-8,";
        // Format our csv file content
        csvContent += "domain : emails" + "\r\n";
        data.forEach(function (rowArray) {
            let row = rowArray.Domain + " : " + rowArray.Emails.join(",");
            csvContent += row + "\r\n";
        });

        // Creating the file
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        let fileName = this.state.niche + "_" + this.state.location;
        link.setAttribute("download", fileName + ".csv");
        link.click();
    }

    /* 
    * description : the method sort the list of domain from which has emails to which has not email
    * params : emailList
    * return : void
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
    
        /* 
    * description : the method display domain and email found on it
    * params : 
    * return : void
    */
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
                    isShowmore: true,
                    forfaitFinished : '' 
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

        /* 
    * description : the method sent the request for searching more emails
    * params : 
    * return : void
    */
        searchMore = async() => {
            await this.showAndHideSearchMore(); /*To show the spinner */
            this.state.isSearchingMore = false; /*Hide the spinner componnent when the search is finished */
    
            try {
                let niche = this.state.niche.toLowerCase()
                let location = this.state.location.toLowerCase()


                await BetterFinders( niche,location, this.props.user.email, this.state.p ).then(data => {
                    
                    if (data.data.length !== 0) {
                        var emailsThatWhereFound = data.data.Results;
        
                        var finalFoundEmails = [];
                        if (emailsThatWhereFound.length !== 0) {
                            for (var i = 0; i < emailsThatWhereFound.length; i++) {
                                // console.log(emailsThatWhereFound[i].Domain);
                                finalFoundEmails.push(emailsThatWhereFound[i]);
                            }
                            var emails = this.state.foundEmails.concat(finalFoundEmails);
                            this.setState({
                                foundEmails: this.sortEmails(emails)
                            })

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
        /* 
    * description : the method sent request for ordering a payment for a forfait choosen
    * params : forfait
    * return : void
    */
        makePayment = async (forfait) => {

            localStorage.setItem("idForfait", forfait.id)
            
            this.setState({
                isPaymentLoading: true,
                chosenForfait: { ...forfait }
            })

            try {
                console.log(forfait);
                makePayments(forfait.price, this.props.user.email, forfait.id).then(res => {

                    if (res.status === 200 || res.status === 201) {
                        this.setState({
                        isPaymentLoading: false,
                    })
                    window.location.href = res.data.redirect_url;
                    } else {
                        console.log('error of notification ');
                        this.addNotification("Please refresh the page and retry again")
                    }
                })
            
            }
            catch (e) {
                console.log(e)
            }
        }
        /* 
    * description : the method sent request to check if the pixel is valid
    * params : foundEmails
    * return : void
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
                    <button onClick={this.searchMore} disabled={this.state.isSearchingMore}>{this.state.isSearchingMore ? <span>Searching... {smallerSpinnerViolet}</span> : <span>Show more</span>}</button>
                </div>
            )
        }else{
            showmore = null;
        }
        let restRequest = "";
        if(this.state.restRequestIsLoad){

            restRequest = <b className="nb_request">{this.state.request}</b>
        }
        return (
           
                
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
                            <div className="titleOfTheInfo endForfaitMessage"> {this.state.forfaitFinished}</div>
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
                            <Forfait pay={this.makePayment} isPayLoading={this.state.isPaymentLoading}/>

                            <div class="coldemail__title"> <h3>Request <span className="numberRequestSpan nb_request">{restRequest}</span></h3></div>

                            <div class="coldemail__title "><h3><span>LEARN HOW TO </span><b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK</a></b></h3></div>
                            <div class="video__course">
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
    
const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(DashboardLead);