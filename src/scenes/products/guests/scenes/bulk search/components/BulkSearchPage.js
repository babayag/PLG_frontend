
import React, { Component } from 'react';
import { NavBar } from "../../../../components/NavBar";
import { BulkSearch } from "../../../../components/BulkSearch"


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
