/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
// import stanley_img from '../dr_stanley.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import NavBarDashboard from './NavBarDashboard';
// import { SearchBar } from './SearchBar';
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const search = <FontAwesomeIcon icon={faSearch} color="white" size="2x"/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

export class Dashboard extends Component {

    constructor(){
        super()
        this.state={
            // emails: emails,
            isLoading: false
        }
    }

    toggle = () => {
      const el = findDOMNode(this.refs.recent__search);
      $(el).slideToggle();
    }

    makePayment = async () => {
      this.setState({
        isLoading: true
      })
      let devUrlLocal = "/api/lead/createPayment";
      try {
          const res = await axios.post(devUrlLocal, { price : "10", description : "tenTowns"}) //await fetch(devUrl);
          if(res.status === 200 || res.status === 201)
          {
              this.setState({
                  isLoading : false,
              })
              window.location.href = res.data.redirect_url;
          }else
          {
              console.log('error of notification ');
              this.addNotification("Please refresh the page and retry again")
          }
      }
      catch(e){
          console.log(e)
      }
    }

    render() {
        return (
          <div class="dashboard__page">
            <NavBarDashboard />

            <div class="dashboard__content">
              <div class="dashboard__content--left">
                <h3>Domain search</h3>
                {/* <SearchBar /> */}
                {/* <SearchResults emailList={this.state.emails}/>  */}
              </div>

              <div class="dashboard__content--right">
                <div class="recent__search">
                  <h3>
                    Get More Emails 
                    {this.state.isLoading && <span> Loading...</span>}
                  </h3> 
                  <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                </div>

                <div class="recent__searchs" ref="recent__search">
                  <h3 onClick={this.makePayment}>10 Emails - 100 Niches</h3>
                  <h3>100 Emails - 1000 Niches</h3>
                </div>

                <div class="coldemail__title"><h3><span>LEARN HOW TO </span><b><a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">SEND COLD EMAIL THAT WORK</a></b></h3></div>
                <div class="video__course">
                  {/* <video width="100%" height="100%" controls poster={stanley_img}>
                    <source src="movie.mp4" type="video/mp4" />
                  </video> */}
                  <a target="_blank" href="https://support.leadmehome.io/i-suck-at-cold_emailing/">
                    {/* <img src={stanley_img} /> */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
