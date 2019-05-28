
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getAllSearches } from '../../../../../../../../services/Api/historicService';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>
const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>
const smallerSpinner = <FontAwesomeIcon icon={faSpinner} color="#fff" size="2x" spin/>

class SearchHistoric extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchList:[],
            searchIsLoad : false
        }
    }



    componentDidMount() {

        /***
         * description: calls getAllSearches service to get the list of all the searches the user has ever made
         * params:  email: email of the current user   
         * return: void
        */
        getAllSearches(this.props.user.email) .then(res => {
            this.setState({
                searchList: res,
                searchIsLoad: true
            })
        })
        .catch(err => {
                
         console.log(err);
        })
     
    }

    /***
     * description: triggers the state that shows and hide spinner when searching emails
     * params: void
     * return: void
    */
    showAndHide(){
        this.setState({
            isLoading : true,
        })
    }

    /***
     * description: Displays the notification with the provided chraracteristics
     * params: title: title of notification, message: message displayed in the notificatio body
     * return: void
     */
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
        let SearchList = <span className="searchHistoricSpinner"> {spinner} </span>;
        if(this.state.searchIsLoad) { 
            SearchList = this.state.searchList.map(search => (
                <tr><td>{search.niche}</td> <td>{search.location}</td><td>{search.counter}</td><td>{search.created_at}</td></tr>
            ))
          
        }

        return (
            <div class="dashboard__page">
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

export default connect(mapStateToProps)(SearchHistoric);