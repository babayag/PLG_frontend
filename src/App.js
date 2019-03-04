import React, { Component } from 'react';
import { Button, View, Text } from 'react';
import ReactPixel from 'react-facebook-pixel';
import ReactQuoraPixel from 'react-quora-pixel';
import {BrowserRouter , Route} from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { Provider } from 'react-redux';
import Store from "./reducers/index";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { WholeLandingPage } from "./components/WholeLandingPage";
import { ExportPage } from "./components/ExportPage";
import { BulkSearch } from "./components/BulkSearch";
import { Dashboard } from "./components/Dashboard";
import { Finder } from "./components/Finder";
import { DashboardLead } from "./components/DashboardLead";
import { DashboardFinder } from "./components/DashboardFinder";
import { Page404 } from "./components/Page404";
// import  TestIt  from "./components/TestIt";

import './App.css';



const advancedMatching = { em: 'some@email.com' };
const options = {
    autoConfig: true, 	// set pixel's autoConfig
    debug: false, 		// enable logs
};

const data = {
  
}

// const quorapixel = () => {
//   !function(q,e,v,n,t,s){if(q.qp) return; n=q.qp=function(){n.qp?n.qp.apply(n,arguments):n.queue.push(arguments);}; n.queue=[];t=document.createElement(e);t.async=!0;t.src=v; s=document.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);}(window, 'script', 'https://a.quora.com/qevents.js');
// qp('init', 'af384036318349ffb92d15b813190967');
// qp('track', 'ViewContent');
// qp('track', 'Generic');
// }
const events = {
  "type": "track",
  "event": "Registered",
  "properties": {
    "plan": "Pro Annual",
    "accountType" : "Facebook"
  }
}

class App extends Component {

  componentDidMount() {

  }

  render() {
    ReactPixel.init('672417766469134');
    ReactPixel.pageView()
    ReactQuoraPixel.init('af384036318349ffb92d15b813190967');
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

          <BrowserRouter>
            <Route exact path={"/dashboard"} component={Dashboard}  />
          </BrowserRouter>

          <BrowserRouter>
            <Route exact path={"/dashboard/lead"} component={DashboardLead}  />
          </BrowserRouter>

          <BrowserRouter>
            <Route exact path={"/dashboard/finder"} component={DashboardFinder}  />
          </BrowserRouter>

          <BrowserRouter>
            <Route exact path={"/finder"} component={Finder}  />
          </BrowserRouter>

          <BrowserRouter>
            <Route exact path={"/404"} component={Page404}  />
          </BrowserRouter>

        </Provider>

      </div>

    );
  }
}

export default App;
