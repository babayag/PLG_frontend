import React, { Component } from 'react';
import { EmailResult } from "./EmailResult";
import {CSVLink} from 'react-csv';
import { CSVDownload } from "react-csv";


export class ExportInCsv extends Component {
    constructor(props){
        super(props);
    }
 
    exportDatasToCsv(){
        console.log(this.props.emailList.data)
    }

    render(){
        return(
            <button className="exportBtn" onClick={this.exportDatasToCsv}>
                
            </button>
        );
    }
}