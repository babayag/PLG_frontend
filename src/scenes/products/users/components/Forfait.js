import React, { Component } from 'react';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import {getAllforfaits} from '../../../../services/Api/forfaitService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Aux from './Hoc';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>

class Forfait extends Component {

    state = {
        isForfaits: false,
        forfaits: []
    }

    /* 
    * description : the method load all forfait available
    * params : 
    * return : void
    */
    componentDidMount() {
        /***
         * description: calls for getAllforfaits service and sets forfait state as the response returned by the service
         * params: void
         * return: void
         */
        getAllforfaits().then(data => {
            this.setState({
                forfaits: data,
                isForfaits: true,
            })
        }).catch(err => {
            this.setState({ isForfaits: true });
            console.log(err);
        })
       
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
        let forfaitsList = <span> Loading...</span>;
        if(this.state.isForfaits) { 
            forfaitsList = this.state.forfaits.map(forfait => (
                <h3 key={forfait.id} onClick={() => this.props.pay(forfait)}>{forfait.email} Emails -  {forfait.niche} Niches</h3>
            ))
        }

        return (
            <Aux>
                 <div class="recent__search">
                  <h3>
                    Get More Emails 
                    {this.props.isPayLoading && <span> Loading...</span>}
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


export default Forfait;