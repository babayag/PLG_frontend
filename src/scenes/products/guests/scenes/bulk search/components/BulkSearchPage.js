
import React, { Component } from 'react';
import { NavBar } from "../../../../common/NavBar";
import { BulkSearch } from "../../../../common/BulkSearch"


export class BulkSearchPage extends Component {
  
  render() {
    return (
      <div className="bulkSearchContainer">
        <NavBar/>
        
        <BulkSearch/>

      </div>
    );
  }
}
