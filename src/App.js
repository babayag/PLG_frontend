import React, { Component } from 'react';
import { NavBar } from "./components/NavBar";
import { LandingPage } from "./components/LandingPage";
import { SearchBar } from "./components/SearchBar";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>

        <LandingPage/>

        <SearchBar/>

      </div>
    );
  }
}

export default App;
