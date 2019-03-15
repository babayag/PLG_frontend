import React, { Component } from 'react';
import NavBarDashboard from "./NavBarDashboard";
import { SliderContent } from "./Slider";

export class DashboardFirefox extends Component {
    render() {
        return (
            <div>
                <NavBarDashboard />
                <div className="container plugin__page chrome__page">
                    <div className="row justify-content-center">
                        <div className="content col-sm-11 col-md-9 col-lg-7">
                            <h1>Leadmehome for Firefox</h1>
                            <p>Leadmehome Firefox extension lets you immediately find the email addresses behind the websites you're browsing.</p>
                            <a href="https://addons.mozilla.org/fr/firefox/addon/leadmehome/" className="download__plugin">Add to Firefox <span>(It's free)</span></a>
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
