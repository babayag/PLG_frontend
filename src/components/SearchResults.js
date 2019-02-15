import React, { Component } from 'react';
import { EmailResult } from "./EmailResult";
import { CSVLink, CSVDownload } from "react-csv";
import { SeeMoreButton } from "./SeeMoreButton"; 




export class SearchResults extends Component {
    constructor(props)
    {
        super(props);
        // this.state = { list }
        //this.props.emailList
    }

    sendDataToExport(){
        this.props.router.push({
            pathname: '/export',
            state: {
              id: 7,
              color: 'green'
            }
          })
    }

    countSources(){  
        if(this.props.emailList.length === 0){
           return <span>No Email Address Found.</span> 

        } else if(this.props.emailList.length === 1){
            return <span>1 Email Address Found. 
                        {/* <a href="/export"> */}
                            <button className="exportBtn"
                                onClick={() => { this.props.router.push({
                                    pathname: '/export',
                                    state: {
                                        color: 'green'
                                    }
                                  })
                                }} 
                            >Export
                                <span className="numberInExportBtn">
                                    {this.props.emailList.length}
                                </span>
                            </button> 
                        {/* </a> */}
                        {/* <CSVLink
                            filename={"my-file.csv"}
                            className="btn exportBtn"
                            target="_blank"
                            data={this.props.emailList}
                            asyncOnClick={true}
                            onClick={
                                this.exportDatasToCsv
                            }
                        >    
                            Export
                            <span className="numberInExportBtn">
                                {this.props.emailList.length}
                            </span> 
                        </CSVLink>   */}
                   </span>
        } else{
            return <span> {this.props.emailList.length} Email Addresses Found. 
                        {/* <a href="/export"> */}
                        <button className="exportBtn"
                                onClick={() => { this.props.push({
                                    pathname: '/export',
                                    state: {
                                        color: 'green'
                                    }
                                  })
                                }} 
                            >Export
                                <span className="numberInExportBtn">
                                    {this.props.emailList.length}
                                </span>
                            </button> 
                        {/* </a> */}
                        {/* <CSVLink
                            filename={"my-file.csv"}
                            className="btn exportBtn"
                            target="_blank"
                            data={this.props.emailList}
                            asyncOnClick={true}
                            onClick={
                                this.exportDatasToCsv
                            }
                        >    
                            Export
                            <span className="numberInExportBtn">
                                {this.props.emailList.length}
                            </span> 
                        </CSVLink>   */}
                    </span>
        }
    }

    isOdd(num) { 
        return num % 2;
    }
    
    render() {  /* We remove 1 to the length because the last object in the json 
        files is not an object we want to read */
        const resultat = this.props.emailList; //this.state.list
        return (
            <div>
                <div class="emailResult numberOfEmails">
                    <p class="text-center numberOfEmails1">
                        {this.countSources()}                     
                    </p>
                    
                </div>
                    {/* this is used to display just the half of the results */  
                    /* {this.props.emailList.slice(0, (this.props.emailList.length + 1)/2).map(item => (
                        (this.props.emailList.length).map(item => (
                        <div class="theResults"> 
                            <p> <EmailResult result= {item}/></p>
                            <span>{item.description}</span>
                        </div>
                     */ 
                    }
                        
                    {/* This displays all the results */
                        (this.props.emailList).map(item => (
                            <div class="theResults"> 
                                <p> <EmailResult result= {item}/></p>
                                <span>{item.description}</span>
                            </div>
                        ))
                    }

                    {/* <div>
                        <SeeMoreButton />
                    </div> */}
                    
            </div>
        );
       
    }
}