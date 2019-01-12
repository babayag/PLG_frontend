import React, { Component } from 'react';
import { NavBar } from "./components/NavBar";
import { LandingPage } from "./components/LandingPage";
import { SearchBar } from "./components/SearchBar";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <NavBar/>

        <LandingPage/>

        <SearchBar/>

      </div>
    );
  }
}

export default App;
