import React, { Component } from 'react';
import { NavBar } from "./NavBar";
import CSVReader from "react-csv-reader";


let domains;
const afterLoading = data => {
  data = data.toString().split(",");
  domains = data;
  console.log(domains);
};

const getListEmail = () => {
    console.log('toto');
}
const reader = (
  <div className="csvContainer">
    <CSVReader
      cssClass="react-csv-input"
      onFileLoaded={afterLoading}
    />
  </div>
);


export class BulkSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            domainList: domains
         }
    }

    render() {
        return (
            <div className="bulkSearchContainer">
                <NavBar/>
                <div class="fileReader">
                  <div class="inner">
                    <h3 class="fileReader__text">Drag and Drop or Click to Import your CSV File</h3>
                    {reader}
                    {getListEmail()}
                  </div>
                </div>

            </div>
        );
    }
}
