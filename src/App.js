import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";

// import { NavBar } from "./components/NavBar";
// import { LandingPage } from "./components/LandingPage";
// import { SearchBar } from "./components/SearchBar";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { WholeLandingPage } from "./components/WholeLandingPage";

import './App.css';

class App extends Component {
  render() {
    return (
      
      <div className="App">
       
        <BrowserRouter>
          <Route exact path="/" component={WholeLandingPage} />
        </BrowserRouter>
        
        <BrowserRouter>
          <Route path="/signup" component={SignupPage} />
        </BrowserRouter>

        <BrowserRouter>
          <Route path="/login" component={LoginPage} />
        </BrowserRouter>
       
        {/* <NavBar/>

        <LandingPage/>

        <SearchBar/> */}

      </div>
    );
  }
}

export default App;
