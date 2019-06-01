
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import  moment  from 'moment';
import {recentSearchLoading} from '../../../../../../../actions/UserSearch/UserSearch';


const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="3x" spin/>


class SearchHistoric extends Component {

    
    componentDidMount() {

      this.props.recentSearchLoadings(this.props.user.email)
     
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
        let Searches = <span className="searchHistoricSpinner"> {spinner} </span>;
       
        if(this.props.search.searchIsLoad) { 
            Searches = this.props.search.searchList.map(search => (
                <tr><td>{search.niche}</td> <td>{search.location}</td><td>{search.counter}</td><td>{moment(search.created_at).format("ddd GG MMM YYYY HH:mm",'en')}</td></tr>
            ))
          
        }

        return (
            <div class="dashboard__page">
                <div className="historic" >
                    <div className="historicData">
                         <h1 id="title_h"> Leads History</h1> 
                            <table id="historictable">  
                              <tbody>
                                <tr>
                                    <th className="description">Niche</th>
                                    <th>Location</th>
                                    <th> x Times</th>
                                    <th className="isvalid">Date</th>
                                </tr>
                                    {Searches}
                              </tbody>
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
        search: state.recentSearch,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        recentSearchLoadings: (email) => {
        dispatch(recentSearchLoading(email));
      }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(SearchHistoric);


