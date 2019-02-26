import React, { Component } from 'react';
import { EmailResult } from "./EmailResult";
import {BrowserRouter , Route, Link} from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import { SeeMoreButton } from "./SeeMoreButton"; 




export class SearchResults extends Component {
    constructor(props)
    {
        super(props);
        this.state = { 
            emails: this.props.emailList,
            fileName: this.props.requestedUrl
         }
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
        if(this.state.emails.length === 0){
           return <span>No Email Address Found.</span> 

        } else if(this.state.emails.length === 1){
            return <span>1 Email Address Found. 
                        <a href="/export">
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
                                    {this.state.emails.length}
                                </span>
                            </button>
                         </a>
                   </span>
        } else{
            return <span> {this.state.emails.length} Email Addresses Found. 
                        <a href="/export">
                        <button className="exportBtn"
                                
                            >Export
                                <span className="numberInExportBtn">
                                    {this.state.emails.length}
                                </span>
                            </button>
                        </a>
                       
                    </span>
        }
    }

    /*this function updates the value of emails by concataining 
    the new search (when we press on show more Button)
    results to the first search result */
    updateEmails = (newEmails) => {
        console.log(this.state.emails);
        this.setState({
            emails: this.state.emails.concat(newEmails) 
        })
        console.log(this.state.emails);
    }
    
    render() { 
        const resultat = this.state.emails; //this.state.list
        return (
            <div>
                <div class="emailResult numberOfEmails">
                    <p class="text-center numberOfEmails1">
                        {this.countSources()}                     
                    </p>
                    
                </div>
                    {/* this is used to display just the half of the results */  
                    /* {this.state.emails.slice(0, (this.state.emails.length + 1)/2).map(item => (
                        (this.state.emails.length).map(item => (
                        <div class="theResults"> 
                            <p> <EmailResult result= {item}/></p>
                            <span>{item.description}</span>
                        </div>
                     */ 
                    }
                        
                    {/* This displays all the results */
                        (this.state.emails).map(item => (
                            <div class="theResults"> 
                                <p> <EmailResult result= {item}/></p>
                                {/* <span>{item.description}</span> */}
                            </div>
                            )
                        )
                    }

                {this.state.emails.length === 0 ?   
                    null :  
                    <SeeMoreButton  
                        requestedUrl={this.props.requestedUrl}
                        firstResults={this.props.firstResults}
                        updateEmails={this.updateEmails} /*this updates the value of the state everytime a new search is done */
                    />
                } 
                    
            </div>
        );
       
    }
}