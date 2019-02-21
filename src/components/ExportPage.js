import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { faDownload, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import { NavBar } from "./NavBar";
import { CSVLink, CSVDownload } from "react-csv";


const download = <FontAwesomeIcon icon={faDownload} />
const externalLink = <FontAwesomeIcon icon={faExternalLinkAlt} />

export class ExportPage extends Component{
    constructor()
    {
        super();
        this.state = { 
            emails: [],
            domain: localStorage.getItem('domain')
         }

         this.findEmails();
    }
    async findEmails() {
        var regEx = /\w+\.\w+/; 
        if(!regEx.test(this.state.domain)) {
            
        }else{  
            /*this resets the value of p so that it is 0 for each new research */
            const devUrl = 'http://leadmehome.io/api/lead/downloadEmails';
            const devUrlLocal = 'http://127.0.0.1:8000/api/lead/downloadEmails';
            //const ProductionURL = 'api/lead/testSharing'; 
            try {
                const res = await axios.post(devUrlLocal, { url : this.state.domain }) //await fetch(devUrl);
                const emails = await res.data.data
                this.setState({
                    emails: emails,
                });
                
            } catch (e) {
            console.log(e);
            }
            
            /*Sets the value of the lastest search to whar the user has entered */

        }
    }

    render(){
        return(
            
            <div>
                <NavBar/>
                <div id="container">
                    
                    <CSVLink
                        id="exportButton"
                        filename={"my-file.csv"}
                        className="exportBtn"
                        target="_blank"
                        data={this.state.emails}
                        asyncOnClick={true}
                        onClick={
                            this.exportDatasToCsv
                        }
                    >    
                        Export
                        <span className="numberInExportBtn">
                             {this.state.emails.length} 
                        </span> 
                    </CSVLink>  
                     
                    <button id="downloadButton">Download   <i >{download}</i></button>
                    <div class="downBloc"></div>
                </div>
            </div>
        );
    }
}