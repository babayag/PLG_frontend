import React, { Component } from 'react';
import { EmailResult } from "./EmailResult";

const list = [
    {
      'email': 'azerty@HTMLAllCollection.com',
      'url': [
        'www.googleAPI.com',
    ]
      
    },
    {
        'email': 'qwerty@gmail.com',
        'url': [
            'www.googleAPI.com',
            'www.googleAPI.cm',
            'www.googleAPI.fr',
        ]
    },
    {
      'email': 'qwwertz@yahoo.de',
      'url': [
        'www.google52API.com',
        'www.go4454ogleAPI.com',
        'www.googgggleAPI.cm',
        'www.googleAPI.fr',
        'www.googleAPI.cr',
        'www.googleAPI.de',
        'www.googgggleAPI.cm',
        'www.googleAPI.fr',
        'www.googleAPI.cr',
        'www.googleAPI.de',
        'www.googgggleAPI.cm',
        'www.googleAPI.fr',
        'www.googleAPI.cr',
        'www.googleAPI.de',
        ]
    }
  ];
  

export class SearchResults extends Component {
    constructor(props)
    {
        super(props);
        this.state = { list }
        //this.props.emailList.data
    }

    countSources(){
        if(this.props.emailList.length <= 0){
           return <span>No Email Address Found.</span> 
        } else if(this.props.emailList.length === 1){
            return <span>1 Email Address Found. <button className="exportBtn">Export <span className="numberInExportBtn">1</span></button> </span>
        } else{
            return <span> {this.props.emailList.length-1} Emails Addresses Found. <button className="exportBtn">Export <span className="numberInExportBtn">{this.props.emailList.length-1}</span></button></span>
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
                    /* {this.props.emailList.data.slice(0, (this.props.emailList.data.length + 1)/2).map(item => (
                        (this.props.emailList.data.length).map(item => (
                        <div class="theResults"> 
                            <p> <EmailResult result= {item}/></p>
                            <span>{item.description}</span>
                        </div>
                     */ }
                        
                        {/* This displays all the results */
                            (this.props.emailList.slice(0, (this.props.emailList.length - 1)).map(item => (
                                <div class="theResults"> 
                                    <p> <EmailResult result= {item}/></p>
                                    <span>{item.description}</span>
                                </div>
                            )))
                        }
            </div>
        );
       
    }
}