import React, { Component } from 'react';
import {BrowserRouter , Route} from "react-router-dom";
import { Provider } from 'react-redux';
import Store from "./reducers/index";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { WholeLandingPage } from "./components/WholeLandingPage";
// import  TestIt  from "./components/TestIt";

import './App.css';

class App extends Component {

  render() {
    return (
      
      <div className="App">
        <Provider store={Store}>
          <BrowserRouter>
            <Route exact path="/" component={WholeLandingPage} />
          </BrowserRouter>
          
          <BrowserRouter>
            <Route path="/signup" component={SignupPage} />
          </BrowserRouter>
          
          <BrowserRouter>
            <Route exact path="/login" component={LoginPage} />
          </BrowserRouter>
        
        </Provider>
      </div>
      
    );
  }
}

export default App;
