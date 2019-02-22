import React, { Component } from 'react';
import { NavBar } from "./NavBar";
import CSVReader from "react-csv-reader";

const afterLoading = data => {
  console.log(data);
};

const reader = (
  <div className="csvContainer">
    <CSVReader
      cssClass="react-csv-input"
      onFileLoaded={afterLoading}
    />
  </div>
);


export class BulkSearch extends Component {
    render() {
        return (
            <div className="bulkSearchContainer">
                <NavBar/>
                <div class="fileReader"> 
                    <h3>Drag and Drop or Click to Import your CSV File</h3>
                    {reader}
                    <button> Bulk Search  </button>
                </div>

            </div>
        );
    }
}