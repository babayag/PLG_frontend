import React, { Component } from 'react';
import { Button, View, Text } from 'react';
import {BrowserRouter , Route} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from 'react-redux';
import Store from "./reducers/index";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { WholeLandingPage } from "./components/WholeLandingPage";
import { ExportPage } from "./components/ExportPage";
import { BulkSearch } from "./components/BulkSearch";
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

          <BrowserRouter>
            <Route exact path={"/export"} component={ExportPage}  />
          </BrowserRouter>

          <BrowserRouter>
            <Route exact path={"/bulksearch"} component={BulkSearch}  />
          </BrowserRouter>

        </Provider>

        
      </div>
      
    );
  }
}

export default App;
