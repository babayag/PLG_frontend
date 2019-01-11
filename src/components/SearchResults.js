import React, { Component } from 'react';
import { EmailResult } from "./EmailResult";

const list = [
    {
      'email': 'azerty@HTMLAllCollection.com',
      'url': 'www.googleFirst.com'
      
    },
    {
        'email': 'qwerty@gmail.com',
        'url': 'www.googleAPI.com'
    },
    {
      'email': 'qwwertz@yahoo.de',
      'url': 'www.google.com'
    }
  ];
  

export class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = { list };
    }
    render() {
        return (
            <div>
                {this.state.list.map(item => (
                <div>
                    <h1> <EmailResult result= {item}/></h1>
                    <span>{item.description}</span>
                </div>
                ))}
            </div>
        );
    }
}