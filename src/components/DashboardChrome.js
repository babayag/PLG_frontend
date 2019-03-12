import React, { Component } from 'react';
import NavBarDashboard from "./NavBarDashboard";
import { SliderContent } from "./Slider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import file from '../leadmehome_chrome_extension.rar'

const downloadIcon = <FontAwesomeIcon icon={faDownload} size="1x" />

export class DashboardChrome extends Component {
    render() {
        return (
            <div>
                <NavBarDashboard />
                <div className="container plugin__page chrome__page">
                    <div className="row justify-content-center">
                        <div className="content col-sm-11 col-md-9 col-lg-7">
                            <h1>Leadmehome for Chrome</h1>
                            <p>Leadmehome Chrome extension lets you immediately find the email addresses behind the websites you're browsing.</p>
                            <a href={file} className="download__plugin">{downloadIcon} Download Extension <span>(It's free)</span></a>
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
