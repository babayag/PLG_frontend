import React, { Component } from 'react';
import { Button, View, Text } from 'react';
import ReactPixel from 'react-facebook-pixel';
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
import { DashboardLead } from "./components/DashboardLead";
import { DashboardFinder } from "./components/DashboardFinder";
// import  TestIt  from "./components/TestIt";

import './App.css';



const advancedMatching = { em: 'some@email.com' };
const options = {
    autoConfig: true, 	// set pixel's autoConfig
    debug: false, 		// enable logs
};
// ReactPixel.init('672417766469134', advancedMatching, options);

// ReactPixel.pageView(); 					// For tracking page view
//ReactPixel.track( event, data ) 		// For tracking default events, more info about events and data https://developers.facebook.com/docs/ads-for-websites/pixel-events/v2.9
//ReactPixel.trackCustom( event, data ) 	// For tracking custom events


class App extends Component {

  componentDidMount() {

  }

  render() {
    ReactPixel.init('672417766469134', advancedMatching, options);
    ReactPixel.pageView()
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
            <Route exact path={"/lead"} component={DashboardLead}  />
          </BrowserRouter>

          <BrowserRouter>
            <Route exact path={"/finder"} component={DashboardFinder}  />
          </BrowserRouter>

        </Provider>


      </div>

    );
  }
}

export default App;
