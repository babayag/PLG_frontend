import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { faDownload, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import { NavBar } from "./NavBar";
import { CSVLink, CSVDownload } from "react-csv";
import dr_screen from "../dr_screen.png";


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
            const devUrl = '/api/lead/downloadEmails';
            const devUrlLocal = 'http://127.0.0.1:8000/api/lead/downloadEmails';
            //const ProductionURL = 'api/lead/testSharing';
            try {
                const res = await axios.post(devUrl, { url : this.state.domain }) //await fetch(devUrl);
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
                <div className="row export__page justify-content-center">
                  <div className="col-sm-10 col-md-7 col-lg-6">
                    <h2>You can export the emails of your prospect below</h2>
                    <div className="exportBtnParent text-center">
                        <CSVLink
                            filename={this.state.domain + ".csv"}
                            className="exportButton"
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
                    </div>
                  </div>
                </div>

                <div className="row export__lesson justify-content-center">
                  <div className="col-sm-11 col-md-10 col-lg-8 d-flex box">
                    <div className="">
                      <img id="screen" src={dr_screen} />
                    </div>
                    <div className="lesson">
                        <h2> I Suck at Cold Emails Course</h2>
                        <a href="https://support.leadmehome.io/i-suck-at-cold_emailing/" target="_blank">
                            Begin Lesson 1
                        </a>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}
