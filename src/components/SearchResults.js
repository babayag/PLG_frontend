import React, { Component } from 'react';
import { EmailResult } from "./EmailResult";

// const list = [
//     {
//       'email': 'azerty@HTMLAllCollection.com',
//       'url': 'www.googleFirst.com'
      
//     },
//     {
//         'email': 'qwerty@gmail.com',
//         'url': 'www.googleAPI.com'
//     },
//     {
//       'email': 'qwwertz@yahoo.de',
//       'url': 'www.google.com'
//     }
//   ];
  

export class SearchResults extends Component {
    
    render() {
        const resultat = this.props.emailList;
        if(resultat !== undefined)
        {
            return (
           
                <div>
                        {this.props.emailList.data.map(item => (
                            <div>
                                <h1> <EmailResult result= {item}/></h1>
                                <span>{item.description}</span>
                            </div>
                            ))}
                </div>
            );
        }
        else
        {
            return (
           
                <div>
                       oops not find
                </div>
            );
        }
        
    }
}