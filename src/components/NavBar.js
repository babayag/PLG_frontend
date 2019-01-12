import React, { Component } from 'react';
import logo from '../plg_logo.png';


export class NavBar extends Component {
    render() {
        return (
            <header class="s-header">

                <div class="header-logo">
                    <a class="site-logo" href="https://google.com">
                        <img src={logo} alt="Homepage"/>
                    </a>
                </div>

                <nav class="row header-nav-wrap wide">
                    {/* <ul class="header-main-nav">
                        <li class="current"><a class="smoothscroll" href="https://google.com" title="intro">Intro</a></li>
                        <li><a class="smoothscroll" href="https://google.com" title="about">About</a></li>
                        <li><a class="smoothscroll" href="https://google.com" title="features">Features</a></li>
                        <li><a class="smoothscroll" href="https://google.com" title="pricing">Pricing</a></li>
                        <li><a href="blog.html" title="blog">Blog</a></li>	
                    </ul> */}
                </nav>
            
            </header> 
        );
    }
}