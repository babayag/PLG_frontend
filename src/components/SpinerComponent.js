
import React, { Component } from 'react';
import axios from 'axios';

export  class SpinerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = this.state = {name:'',company:'',
         blog: '',
         avatar:'',
         loading: false
       }
      }
       componentDidMount() 
       {  
         axios.get("https://api.github.com/users/KrunalLathiya")
           .then(response => { 
             this.setState({
               name:response.data.name,
               company:response.data.company,
               blog: response.data.blog,
               avatar:response.data.avatar_url,
               loading: false
             });
           })
           .catch(error => {
             console.log(error);
           });
       }

   render()
   {
    let data;
    if (this.state.loading) {
      data = <img  src={ require('../loader.gif') } />
    } else {
      data = <div>
                <br/>
                Name: {this.state.name}
                <br/>
                Company: {this.state.company}
                <br/>
                Blog: {this.state.blog}
                <br/>
                <img src={this.state.avatar}/>
            </div> 
    }
      return(
      <div>
            {data}
       </div>
      )
   }
}