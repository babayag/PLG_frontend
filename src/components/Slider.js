import React from "react";
import Slider from "react-slick";
import img1 from '../plugin_img_1.PNG'
import img2 from '../plugin_img_2.PNG'


export class SliderContent extends React.Component {
    render() {
        var settings = {
            dots: true
        };
        return (
            <div className="container">
                <Slider {...settings}>
                    <div className="slide">
                        <img src={img1} alt="LeadmeHome Extension" />
                        <div className="slider__desc">
                            <h4>Type a domain name to find email addresses.</h4>
                            <p>Click on the Get Email addresses button.</p>
                        </div>
                    </div>
                    <div className="slide">
                        <img src={img2} alt="LeadmeHome Extension" />
                        <div className="slider__desc">
                            <h4>Get immediately a list of email addresses associated with the website and their public sources</h4>
                            {/* <p>Get immediately a list of email addresses associated with the website and their public sources</p> */}
                        </div>
                    </div>

                </Slider>
            </div>
        );
    }
}

