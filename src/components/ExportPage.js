import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons'
import { NavBar } from "./NavBar";
import { CSVLink, CSVDownload } from "react-csv";


const download = <FontAwesomeIcon icon={faDownload} />
const externalLink = <FontAwesomeIcon icon={faExternalLinkAlt} />

export class ExportPage extends Component{
    constructor()
    {
        super();
    }

    testData(){
        var data = this.props;
        alert(data);
        console.log(data);
    }

    render(){
        return(
            <div>
                <NavBar/>
                <div id="container">
                    {this.testData()}
                    <CSVLink
                        filename={"my-file.csv"}
                        className="btn exportBtn"
                        target="_blank"
                        data={this.props.emailList.data}
                        asyncOnClick={true}
                        onClick={
                            this.exportDatasToCsv
                        }
                    >    
                        Export
                        <span className="numberInExportBtn">
                            {this.props.emailList.data.length}
                        </span> 
                    </CSVLink>  
                    
                    <button id="exportButton">Export        <i >{externalLink}</i></button>
                    <button id="downloadButton">Download   <i >{download}</i></button>
                    <div class="downBloc"></div>
                </div>
            </div>
        );
    }
}