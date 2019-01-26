import React, { Component } from 'react';
import axios from 'axios';
import { SearchResults } from "./SearchResults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'

const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="2x" spin/>

export class SearchBar extends Component {

    constructor(){
        super()
        this.state = {
            isAboutVisible: false,
            emails : [],
            isload : false,
            message :"",
        }
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
      
    async findEmails() {
        await this.showAndHide();
        this.state.isload = false;
        this.state.isAboutVisible = true;
        const devUrl = 'http://127.0.0.1:8000/api/lead/testSharing';
        //const ProductionURL = 'api/lead/testSharing';
        try {
           
            const res = await axios.post(devUrl, { url : this.state.message}) //await fetch(devUrl);
            const emails = res.data
            //const emails = await res.json();
            console.log(res.data);
            this.setState({
                emails
            });
            
        } catch (e) {
          console.log(e);
        }
      }
      showAndHide(){ 
        this.setState({
            isload : true, 
        })
    }
    _handleKeyPress = e => {
        if(e.keyCode === 13){ 
            this.findEmails()
        } 
        
    }
    render() {
        return (
            <div>
                <div className="searchBarBox">
                    <div className="quaterWidthDiv"> </div>
                    <div className="topnav">
                        <div className="search-container">
                            
                            <input type="text"
                            name="message"
                            onChange={this.handleChange}
                            value={this.state.message}
                            placeholder="medievaltimes.com"
                            onKeyDown={this._handleKeyPress}
                            />
                            <div >
                                <button onClick={() => this.findEmails} disabled={this.state.isload}><span>{ this.state.isload ? <span>{spinner}</span> :  <span>Find My Leads</span>  }</span></button>
                                {/* <button onClick={() => this.showAndHide()}>Find My Leads</button> */}
                            </div>
                        </div>
                        
                        {/* <div class="searchBarIndication">
                            <p> Just enter a domain name and watch the magic happen! <br/>
                                For instance try google.com or medievaltimes.com
                            </p> 
                        </div> */}
                    </div>
                    <div className="quaterWidthDiv">
                    </div>
                </div>
                <div className="appendedResultBlock">    
                    {/* <SearchResults emailListe={this.state.list}/> */}
                    { this.state.isAboutVisible ? <SearchResults emailList={this.state.emails ? this.state.emails : null}/> : null }
                </div>    
                <div className="notReadyDiv"> 
                    <p>
                        Not Ready to Get Started? Learn More {/*<!-- will be a link to allow page scroll-->*/}
                    </p>
                </div>
            </div>
        );
    }
}