import React, { Component } from 'react';



export class SeeMoreButton extends Component {
    constructor(){
        super()
        this.state={
        }
    }


    render() {

        return (
            <div className="seeMoreBtnParent">
                <div className="quaterWidthDiv"> </div>
                <div className="emailResult seeMoreBtnParentFirstChild">
                    <div className="theResults"> 
                        <p> <button>Show more </button> </p>
                    </div>
                </div>
            </div>    
        );
    }
}