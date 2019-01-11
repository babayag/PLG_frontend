import React, { Component } from 'react';
import { SearchResults } from "./SearchResults";

export class SearchBar extends Component {
    constructor(){
        super();
        this.state = {render:''}
    }
    handleClick(compName, e){
        console.log(compName);
        this.setState({render:compName});        
    }
    _renderSubComp(){
        switch(this.state.render){
            case 'chockers': return <SearchResults/>
        }
    }
    render() {
        return (
            <div>
                <div class="searchBarBox">
                    <div class="quaterWidthDiv"> </div>
                    <div class="topnav">
                        <div class="search-container">
                            
                            <input type="text" placeholder="medievaltimes.com" name="search"/>
                            <button onClick={this.handleClick.bind(this, 'chockers')}>Find My Leads</button>
                            
                        </div>
                        {/* <div class="searchBarIndication">
                            <p> Just enter a domain name and watch the magic happen! <br/>
                                For instance try google.com or medievaltimes.com
                            </p> 
                        </div> */}
                    </div>
                    <div class="quaterWidthDiv"> </div>
                </div>
                <div class="notReadyDiv"> 
                    <p>
                        Not Ready to Get Started? Learn More {/*<!-- will be a link to allow page scroll-->*/}
                    </p>
                </div>
                {this._renderSubComp()}
            </div>
        );
    }
}