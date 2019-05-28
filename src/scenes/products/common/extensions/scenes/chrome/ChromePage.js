import React, { Component } from 'react';
import { NavBar } from "../../../../common/NavBar";
import { SliderContent } from "../Slider";

export class ChromePage extends Component {
    render() {
        return (
            <div>
                 <NavBar />
                <div className="container plugin__page chrome__page">
                    <div className="row justify-content-center">
                        <div className="content col-sm-11 col-md-9 col-lg-7">
                            <h1>Leadmehome for Chrome</h1>
                            <p>Leadmehome Chrome extension lets you immediately find the email addresses behind the websites you're browsing.</p>
                            <a href="https://chrome.google.com/webstore/detail/leadmehome/kjfgnlanbaeoljhmiommbmjgjcacfghc/related?h1=fr" className="download__plugin"> Add to Chrome <span>(It's free)</span></a>
                        </div>
                    </div>
                </div>
                <div className="container my-5">
                    <div className="row py-5 justify-content-center">
                        <div className="content col-sm-11 col-md-10 col-lg-10">
                            <SliderContent />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
