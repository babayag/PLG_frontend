import React, { Component } from 'react';
import { NavBar } from "./NavBar";
import { CSVLink } from "react-csv";
import dr_screen from "../img/dr_screen.png";
import NavBarDashboard from '../users/components/NavBarDashboard';
import {getDomains} from '../../../services/Api/exportService'

export class ExportPage extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            emails: [],
            domain: localStorage.getItem('domain')
         }

         this.findEmails();
    }

    /* 
    * description : the method send request for download email as csv
    * params : 
    * return : void
    */
    async findEmails() {
        var regEx = /\w+\.\w+/;
        
        console.log(this.state.domain);
        if(!regEx.test(this.state.domain)) {

        }else{
           
            getDomains(this.state.domain).then(res => {
                this.setState({
                    emails: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    render(){
        return(

            <div>
                {this.props.isSignedIn ? 
                    <NavBarDashboard />
                     :
                    <NavBar />
                }

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
