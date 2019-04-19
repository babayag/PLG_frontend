
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import NavBarDashboard from './NavBarDashboard';
import stanley_img from '../dr_stanley.png';
import ReactNotification from "react-notifications-component";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Forfait from './Forfait'

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>
const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>
const smallerSpinner = <FontAwesomeIcon icon={faSpinner} color="#fff" size="2x" spin/>

class UserSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchList:[],
            searchIsLoad : false
        }
    }



    componentDidMount() {
        

        let devUrlLocal = "http://127.0.0.1:8000/api/lead/getallusersearch";
        let user = { email: this.props.user.email };
        try {
            axios.post(devUrlLocal,user)
            .then(res => {
                this.setState({
                    searchList: res.data,
                    searchIsLoad: true
                })
            })
            .catch(err => {
                
                console.log(err);
            })
        } catch (e) {
            console.log(e)
        }
    }


    showAndHide(){
        this.setState({
            isLoading : true,
        })
    }

    /*Displays the notifications with the following chraracteristics */
    addNotification(title, message) {
        this.notificationDOMRef.current.addNotification({
            title: title,
            message: message,
            type: "awesome",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 5000 },
            dismissable: { click: true }
        });
    }

    

    render() {
        let SearchList = <span> Loading...</span>;
        if(this.state.searchIsLoad) { 
            SearchList = this.state.searchList.map(search => (
                <tr><td>{search.niche}</td> <td>{search.location}</td><td>{search.counter}</td><td>{search.created_at}</td></tr>
            ))
          
        }

        return (
            <div class="dashboard__page">
                <NavBarDashboard />
                <div className="historic" >


                    <div className="historicData">
                       
                         <h1 id="title_h"> Leads History</h1> 
                            <table id="historictable">  
                                <tr>
                                    <th className="description">Niche</th>
                                    <th>Location</th>
                                    <th> x Times</th>
                                    <th className="isvalid">Date</th>
                                </tr>

                                    {SearchList}
                    
                            </table>
  

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(UserSearch);