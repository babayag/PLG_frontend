import React, { Component } from 'react';
// import { Button, View, Text } from 'react';
import ReactPixel from 'react-facebook-pixel';
import ReactQuoraPixel from 'react-quora-pixel';
import {BrowserRouter, Switch , Redirect , Route} from "react-router-dom";
import "react-notifications-component/dist/theme.css";
import { Provider, connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';


import {auth} from "./actions";
import Store from "./reducers/index";
import  SignupPage  from "./scenes/auth/signUp/components/SignupPage";
import  LoginPage  from "./scenes/auth/login/components/LoginPage";
import { WholeLandingPage } from "./scenes/products/guests/scenes/landing page/components/WholeLandingPage";
import { ExportPage } from "./scenes/products/common/ExportPage";
import { BulkSearchPage } from "./scenes/products/guests/scenes/bulk search/components/BulkSearchPage";
import { Dashboard } from "./scenes/products/users/scenes/dashboard/component/DashboardPage";
import { EmailsFinderPage } from "./scenes/products/guests/scenes/emails finder/components/EmailsFinderPage";
import  DashboardLeadFinderPage  from "../src/scenes/products/users/scenes/leadfinder/components/DashboardLeadFinderPage";
import { DashboardFinder } from "./scenes/products/users/scenes/emailFinder/components/DashboardEmailFinderPage";
import { DasboardBulkSearch } from "./scenes/products/users/scenes/bulksearch/components/DashboardBulkPage";
import { Page404 } from "./components/Page404";

// import { DashboardChrome } from "./components/DashboardChrome";
// import { DashboardFirefox } from "./components/DashboardFirefox";
import { ChromePage } from "./scenes/products/common/extensions/scenes/chrome/ChromePage";
import { FirefoxPage } from "./scenes/products/common/extensions/scenes/firefox/FirefoxPage";
import { LeadsPage } from './scenes/products/guests/scenes/leads finder/components/LeadsPage';
import DashboardPayment  from "./scenes/products/users/scenes/leadfinder/components/DashboardPayment";
import PaymentHistoricPage from "./scenes/products/users/scenes/historics/scenes/payement/PaymentHistoricPage"
import SearchHistoricPage from "./scenes/products/users/scenes/historics/scenes/search/SearchHistoricPage"

// import  TestIt  from "./components/TestIt";

import './App.css';


const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="5x" spin/>

class RootContainerComponent extends Component {
  constructor(props)
  {
    super(props);

  }
  componentDidMount() {
    this.props.loadUser();
  }
  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <div style={{marginTop: 150+'px', textAlign:'center'}}> 
                  <em>{spinner}</em>; 
                  <br></br> <br></br>
                  <em>Loading...</em>
                </div>
      } else if (!this.props.auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }


  render() {
    let {PrivateRoute} = this;
    return (
      <BrowserRouter>
        <Switch>
            <PrivateRoute exact path={"/dashboard"} component={Dashboard}  />
            <PrivateRoute exact path={"/dashboard/lead"} component={DashboardLeadFinderPage}  />
            <PrivateRoute exact path={"/dashboard/finder"} component={DashboardFinder}  />
            <PrivateRoute exact path={'/dashboard/bulksearch'} component={DasboardBulkSearch} />
            {/* <PrivateRoute exact path={'/dashboard/chrome'} component={DashboardChrome} />
            <PrivateRoute exact path={'/dashboard/firefox'} component={DashboardFirefox} /> */}
            <PrivateRoute exact path={'/dashboard/payment'} component={DashboardPayment} />
            <PrivateRoute exact path="/dashboard/history/payment" component={PaymentHistoricPage} />
            <PrivateRoute exact path="/dashboard/history/leadsearch" component={SearchHistoricPage} />
            <Route exact path="/" component={WholeLandingPage} />
            <Route exact path={"/finder"} component={EmailsFinderPage}  />
            <Route exact path={"/lead"} component={LeadsPage}  />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path={"/export"} component={() => <ExportPage isSignedIn={this.props.auth.isAuthenticated} />}  />
            <Route exact path={"/bulksearch"} component={BulkSearchPage}  />
            <Route exact path={"/chrome"} component={() => <ChromePage isSignedIn={this.props.auth.isAuthenticated} />}  />
            <Route exact path={"/firefox"} component={() => <FirefoxPage isSignedIn={this.props.auth.isAuthenticated} />}/>
            <Route component={() => <Page404 isSignedIn={this.props.auth.isAuthenticated} /> }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps,mapDispatchToProps)(RootContainerComponent);


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

  render() {
    ReactPixel.init('672417766469134');
    ReactPixel.pageView()
    ReactQuoraPixel.init('af384036318349ffb92d15b813190967');
    console.log(Store);
    return (
      <div className="App">
        <Provider store={Store}>
          <RootContainer />
        </Provider>
      </div>

    );
  }
}
export default (App);
