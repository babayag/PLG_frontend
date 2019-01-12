import React, { Component } from 'react';
import axios from 'axios';
import { SearchResults } from "./SearchResults";

export class SearchBar extends Component {
    state = {
        isAboutVisible: false,
        emails : [],
        message :"",
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    async findEmails() {
        this.state.isAboutVisible = true;
        const devUrl = 'http://127.0.0.1:8000/api/lead/testSharing';
        const ProductionURL = 'api/lead/testSharing';
        try {
          const res = await axios.post(devUrl, { url : this.state.message}) //await fetch(devUrl);
          const emails = res.data
          //const emails = await res.json();
          console.log(res.data);
          this.setState({
            emails
          });
          //console.log(this.state.emails);
          //console.log(this.state.isAboutVisible);
          
        } catch (e) {
          console.log(e);
        }
        //console.log(this.state.isAboutVisible);
      }
    render() {
        return (
            <div>
                <div class="searchBarBox">
                    <div class="quaterWidthDiv"> </div>
                    <div class="topnav">
                        <div class="search-container">
                            
                            <input type="text"
                name="message"
                onChange={this.handleChange}
                value={this.state.message}
                placeholder="medievaltimes.com"/>
                            <button onClick={() => this.findEmails()} >Find My Leads</button>
                            
                        </div>
                        {/* <div class="searchBarIndication">
                            <p> Just enter a domain name and watch the magic happen! <br/>
                                For instance try google.com or medievaltimes.com
                            </p> 
                        </div> */}
                    </div>
                    <div class="quaterWidthDiv"> </div>
                </div>
                { this.state.isAboutVisible ? <SearchResults emailList={this.state.emails ? this.state.emails : null}/> : null }
                <div class="notReadyDiv"> 
                    <p>
                        Not Ready to Get Started? Learn More {/*<!-- will be a link to allow page scroll-->*/}
                    </p>
                </div>
            </div>
        );
    }
}