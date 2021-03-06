import React, { Component } from 'react';
import { EmailResult } from "./EmailResult";
import { SeeMoreButton } from "./SeeMoreButton";

export class SearchResults extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            emails: this.props.emailList,
            fileName: this.props.requestedUrl
         }
    }

    /* 
    * description : the method data to export 
    * params : 
    * return : void
    */
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
           return <span><span class="text-right">No Email Address Found.</span><br/><span className="mt-3 d-block" id="training__post_id">LEARN HOW TO <b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK.</a></b></span></span>

        } else if(this.state.emails.length === 1){
            return <span><span class="text-right">1 Email Address Found.</span>
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
                         </a><br/>
                         <span className="mt-3 d-block" id="training__post_id">LEARN HOW TO <b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK.</a></b></span>
                   </span>
        } else{
            return <span><span class="text-right">{this.state.emails.length} Email Addresses Found.</span>
                        <a href="/export">
                        <button className="exportBtn"

                            >Export
                                <span className="numberInExportBtn">
                                    {this.state.emails.length}
                                </span>
                            </button>
                        </a><br/>
                        <span className="mt-3 d-block" id="training__post_id">LEARN HOW TO <b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK.</a></b></span>
                    </span>
        }
    }

    /* 
    * description : the method update list of email when we search more 
    * params : newEmails 
    * return : void
    */
    updateEmails = (newEmails) => {
        
        this.setState({
            emails: this.state.emails.concat(newEmails)
        })
        
    }

    render() {
        const resultat = this.state.emails; //this.state.list
        return (
            <div>
                <div class="emailResult numberOfEmails email__numberResults">
                    <p class="numberOfEmails1">
                        {this.countSources()}
                    </p>

                </div>

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
