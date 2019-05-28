import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";
import CSVReader from "react-csv-reader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from "react-csv";
import {getListEmails} from "../../../services/Api/bulksearchService"


const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>

export class BulkSearch extends Component {
  
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


    /***
* description: splits current data by comma 
* params: void
* return: void
*/
  afterLoading = data =>{
    let domains;
    data = data.toString().split(",");
    domains = data;

    this.setState({
      domainList: domains,  // is set to true when the draged and dropped file is read
      fileIsRead: true,   //is set to true when the draged and dropped file is read
    })
  };

  /***
* description: calls getListEmails service 
* params: void
* return: void
*/
  getListEmail = async () => {
    await this.showAndHide();
    this.state.isBulkSearchProcessing = false;
    this.state.canDownLoad = true;
 
    try{
   
      await getListEmails({'domains' : this.state.domainList}).then(data => {

      let finalData = [];
      for(var i=0; i<data.length; i++){
        for(var j=0; j<data[i].concern.length; j++){ //study the structure of the data object to understand this logic
          finalData.push(data[i].concern[j])
        }
      }
      
      this.setState({
        dataThatWillBeDownloaded: finalData, //we set the value of this state as the data that will be downloaded into csv
        canDownLoad: true  //at the end of the search we display the download button by triggering it there
      })
    })
    
    }
    catch(e){
      console.log(e);
      this.setState({
        isBulkSearchProcessing : false,
      canDownLoad: false,
      fileIsRead: false,
      })
      this.addNotification("An error occured", "Please refresh the page and try again.")

    }
  }
/***
* description: sets the isBulkSearchProcessing state to true
* params: void
* return: void
*/
  showAndHide(){
    this.setState({
      isBulkSearchProcessing : true,
    })
  }

  /***
* description: downlod the data 2 second after clicking on export 
* params: void
* return: void
*/
  exportDatasToCsv(){
    setTimeout(
      function() {
        window.location.reload();
      }
      .bind(this),
      2000
    );
  }

  /***
* description: Displays the notification with the provided chraracteristics
* params: title: title of notification, message: message displayed in the notificatio body
* return: void
*/

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

  render() {
    return (
      <div className="bulkSearchContainer">
        <div class="fileReader">
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
    );
  }
}
