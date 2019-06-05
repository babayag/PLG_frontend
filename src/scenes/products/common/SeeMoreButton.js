import React, { Component } from 'react';
import ReactNotification from "react-notifications-component";
import {findEmailSeeMore} from '../../../services/Api/searchEmailService';
import {connect} from "react-redux";
import {fetchSeeMore} from '../../actions/searchEmail/seeMore';




 class SeeMoreButton extends Component {
    constructor(props){
        super(props)
        this.state={
           requestedUrl: this.props.requestedUrl,
        //     firstResults: this.props.firstResults,
        //     newResults: [],
          isloading: false,
        //     valueOfp: this.props.firstResults[1],
           hideShowMore: false
        }
        /*Without these, notification won't work */
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    /* 
    * description : the method run the request for searching new email 
    * params : 
    * return : void
    */
    async findNewEmails() {
       
        // this.setState({
        //     isloading: true
        // });
        
        console.log(this.props.globalState);
        console.log(this.props);
    
    await this.props.fetchSeeMores(this.props.requestedUrl, this.props.seeMoreState.valueOfp);
    console.log(this.props.globalState);
   console.log(this.props.seeMoreState.valueOfp);
   console.log("roland");
   //console.log(this.props.globalState.emails);
    //this.props.updateEmails(this.props.globalState.emails);
    //  await findEmails(this.props.globalState.url, this.props.globalState.valueOfp).then(data => {
    //          console.log(this.props.globalState);
    //             this.setState({
    //                 newResults: this.state.newResults.concat(data.data[0]),
    //                 valueOfp : data.data[1],
    //                 hideShowMore : data.data[2]
    //             });
    //             this.props.updateEmails(data.data[0])
    //          }).catch(err =>{
    //              console.log(err)
    //             this.setState({
    //                 isloading: false
    //             });
    //             this.addNotification("An error occured", "Please try again.")
    //          })
       
    //         this.setState({
    //             isloading: false
    //         });
    //         if(!this.state.hideShowMore){
    //             this.setState({
    //                 hideShowMore: true
    //             });
    //         }

        
           

     }

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
        console.log(this.props.seeMoreState.valueOfp);

        return (
            <div className="newResults">

                <div className="theResults seeMoreBtnParent the moreresult">
                    <div className="quaterWidthDiv"> </div>
                    <div className="emailResult seeMoreBtnParentFirstChild seemorebtn">

                        <p>
                        {/* <div className="theResults">  */}
                            {this.state.hideShowMore ?

                                <h4>All emails have been found </h4>
                                :
                                <div>

                                    <button onClick={() => this.findNewEmails()} disabled={this.state.isloading}>
                                        {this.state.isloading?
                                            <span>Searching...</span>
                                            :<span>Show more</span>
                                        }

                                    </button>
                                </div>

                            }
                        </p>

                    </div>

                    {/* </div> */}
                </div>
                <div className="quaterWidthDiv"> </div>

                <ReactNotification 
                    types={[{
                        htmlClasses: ["notification-awesome"],
                        name: "awesome"
                    }]} 
                    ref={this.notificationDOMRef} 
                    style="text-align:left !important"
                />
            </div>    
        );
    }
}

const mapStateToProps = state => {
    console.log(state.toggleSearchEmail);
    return {
      seeMoreState: state.toggleSearchEmail,
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
      fetchSeeMores: (url,p) => {
        dispatch(fetchSeeMore(url,p));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SeeMoreButton);
