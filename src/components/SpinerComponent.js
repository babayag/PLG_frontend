
import React, { Component } from 'react';

export class SpinerComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false
       }
    }

   render()
   {
    let data;
    if (!this.state.loading) {
      data = <img  src={ require('../loader.gif') } />
    } 
      return(
      <div>
        {data}
      </div>
      )
   }
}