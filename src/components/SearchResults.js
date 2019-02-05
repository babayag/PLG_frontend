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
        if(this.props.emailList.data.length === 0){
           return <span>No email found.</span> 
        } else if(this.props.emailList.data.length === 1){
            return <span>1 Email found.</span>
        } else{
            return <span> {this.props.emailList.data.length} Emails found.</span>
        }
    }

    isOdd(num) { 
        return num % 2;
    }
    
    render() {
        const resultat = this.props.emailList; //this.state.list
        return (
            <div>
                <div class="emailResult numberOfEmails">
                    <p class=""> 
                        {this.countSources()}  
                    </p>
                </div>
                    {this.props.emailList.data.slice(0, (this.props.emailList.data.length + 1)/2).map(item => (
                        <div class="theResults"> 
                            <p> <EmailResult result= {item}/></p>
                            <span>{item.description}</span>
                        </div>
                    ))}
            </div>
        );
       
    }
}