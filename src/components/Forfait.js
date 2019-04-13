import React, { Component } from 'react';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Aux from './Hoc';

const chevronDown = <FontAwesomeIcon icon={faChevronDown} color="#333333" size="1x"/>
const spinner = <FontAwesomeIcon icon={faSpinner} color="#ffffff" size="2x" spin />

class Forfait extends Component {

    state = {
        isForfaits: false,
        forfaits: []
    }

    componentDidMount() {
        

        let devUrlLocal = "http://127.0.0.1:8000/api/lead/getAllforfait";
        try {
            axios.post(devUrlLocal)
            .then(res => {
                console.log(res.data)
                this.setState({
                    forfaits: res.data,
                    isForfaits: true,
                })
            })
            .catch(err => {
                this.setState({ isForfaits: true });
                console.log(err);
            })
        } catch (e) {
            console.log(e)
        }
    }

    toggle = () => {
        const el = findDOMNode(this.refs.recent__search);
        $(el).slideToggle();
    }    

    render() {
        let forfaitsList = <span> Loading...</span>;
        if(this.state.isForfaits) { 
            forfaitsList = this.state.forfaits.map(forfait => (
                <h3 key={forfait.id} onClick={() => this.props.pay(forfait)}>{forfait.email} Emails - {forfait.niche} Niches</h3>
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