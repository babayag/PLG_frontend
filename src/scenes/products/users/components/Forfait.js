import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import {getAllforfaits} from '../../../../services/Api/forfaitService';
import { } from '../../../actions/forfait/forfait';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Aux from './Hoc';
import { fetchForfait } from '../../../actions/forfait/forfait'

const spinner = <FontAwesomeIcon icon={faSpinner} color="#5e06d2" size="2x" spin/>
const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

class Forfait extends Component {

    
    /* 
    * description : the method load all forfait available
    * params : 
    * return : void
    */
    componentDidMount() {
        /***
         * description: calls for getAllforfaits service and sets forfaits state as the response returned by the service
         * params: void
         * return: void
         */
        this.props.fetchForfaits();
    }
        /***
         * description: dropdown menu
         * params: void
         * return: void
         */
    toggle = () => {
        const el = findDOMNode(this.refs.recent__search);
        $(el).slideToggle();
    }    

    render() {
        let forfaitsList = <span> {spinner}</span>;
        if(!this.props.isForfaitLoading) { 
            console.log(this.props.forfaits.forfaits);
            forfaitsList = this.props.forfaits.forfaits.map(forfait => (
                <h3 key={forfait.id} onClick={() => this.props.pay(forfait)}>{forfait.email} Emails -  {forfait.niche} Niches</h3>
            ))
        }

        return (
            <Aux>
                 <div class="recent__search">
                  <h3>
                    Get More Emails 
                    {this.props.forfaits.isForfaitLoading && <span> {spinner} </span>}
                  </h3> 
                  <h3 class="recent__search-icon" onClick={this.toggle}>{chevronDown}</h3>
                </div>

                <div class="recent__searchs" ref="recent__search">
                    {forfaitsList}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
      forfaits: state.forfaits,
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
      fetchForfaits: () => {
        dispatch(fetchForfait());
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Forfait);