import React, { Component } from 'react';
import axios from 'axios';
import ReactNotification from "react-notifications-component";
import { NavBarDashboard } from "./NavBarDashboard";
import CSVReader from "react-csv-reader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import stanley_img from '../dr_stanley.png';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";



const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class DasboardBulkSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      domainList: [],
      isBulkSearchProcessing: false,
      displayedTextWhileSearching: "Wait while we get your email addresses...", //name speaks itself
      canDownLoad: false, //search is finished, user can download
      fileIsRead: false,   //this will trigger the displaying of the button that starts the bullk search
      dataThatWillBeDownloaded: [], //object name speaks itself
    }
    /*Without these, notification won't work */
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  toggle = () => {
    const el = findDOMNode(this.refs.recent__search);
    $(el).slideToggle();
  }

  afterLoading = data =>{
    let domains;
    data = data.toString().split(",");
    domains = data;

    console.log(domains);

    this.setState({
      domainList: domains,  // is set to true when the draged and dropped file is read
      fileIsRead: true,   //is set to true when the draged and dropped file is read
    })
  };

  getListEmail = async () => {
    await this.showAndHide();
    this.state.isBulkSearchProcessing = false;
    this.state.canDownLoad = true;
    console.log(this.state.domainList)
    const devUrl = '/api/lead/getAllDomains';
    const devUrlLocal = 'http://127.0.0.1:8000/api/lead/getAllDomains';
    try{
      const res = await axios.post(devUrl, {'domains' : this.state.domainList}) //await fetch(devUrl);
      const data = res.data.data;
      let finalData = [];
      // data = data[0];
      for(var i=0; i<data.length; i++){
        for(var j=0; j<data[i].concern.length; j++){ //study the structure of the data object to understand this logic
          finalData.push(data[i].concern[j])
        }
      }
      console.log(finalData);
      console.log(data[0].concern);
      this.setState({
        dataThatWillBeDownloaded: finalData, //we set the value of this state as the data that will be downloaded into csv
        canDownLoad: true  //at the end of the search we display the download button by triggering it there
      })
    }
    catch(e){
      console.log(e);
      this.setState({
        isBulkSearchProcessing : false,
      canDownLoad: false,
      fileIsRead: false,
      })
      this.addNotification("Please refresh the page and try again.")

    }
  }

  showAndHide(){
    this.setState({
      isBulkSearchProcessing : true,
    })
  }

  exportDatasToCsv(){
    setTimeout(
      function() {
        window.location.reload();
      }
      .bind(this),
      2000
    );
  }

  addNotification(message) {
    this.notificationDOMRef.current.addNotification({
        title: "Error",
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

  render() {
    return (
      <div className="bulkSearchContainer">
        <NavBarDashboard/>
        <div>
            {/* <span>Left Side</span> */}
            <div class="lead__dashboard">
                <div class="lead__dashboard__content">
                    <div class="lead__dashboard--left">
                        <div class="fileReader dashboard__content--left">
                            <div class="inner">
                                <h3 class="fileReader__text">Drag and Drop or Click to Import your CSV File</h3>
                                <div className="csvContainer">
                                <CSVReader
                                    cssClass="react-csv-input"
                                    onFileLoaded={this.afterLoading}
                                />
                                <div className="buttonsBox">
                                    {
                                    this.state.canDownLoad ?
                                    <CSVLink
                                        filename={"Bulksearch.csv"}
                                        className="exportButton bulkbtn"
                                        target="_blank"
                                        data={this.state.dataThatWillBeDownloaded}
                                        asyncOnClick={true}
                                        onClick={
                                        this.exportDatasToCsv
                                        }
                                    >
                                        Download Result
                                    </CSVLink> :
                                    <div>
                                        {
                                        this.state.fileIsRead ?
                                        <div>
                                            {
                                            this.state.isBulkSearchProcessing ?
                                            <div>
                                                <h5>{this.state.displayedTextWhileSearching}</h5>
                                                <span>{spinner}</span>
                                            </div>:
                                            <button onClick={this.getListEmail}>Bulk Search</button>
                                            }
                                        </div> :
                                        <span></span>
                                        }
                                    </div>
                                    }
                                </div>
                                </div>
                            </div>
                        </div>
                        <ReactNotification
                        types={[{
                            htmlClasses: ["notification-awesome"],
                            name: "awesome"
                        }]}
                        ref={this.notificationDOMRef}
                        style="text-align:left !important"
                        />
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
        </div>
      </div>
    );
  }
}
