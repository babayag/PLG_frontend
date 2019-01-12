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

    constructor(props) {
        super(props);
        this.state = { list };
    }
    render() {
        return (
            <div>
                {this.state.list.map(item => (
                <div class="theResults">
                    <p> <EmailResult result= {item}/></p>
                    <span>{item.description}</span>
                </div>
                ))}
            </div>
        );
    }
}