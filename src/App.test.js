import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {NavBar} from './components/NavBar';
import {LoginPage} from './components/LoginPage';
import {SignupPage} from './components/SignupPage';
import {LandingPage} from './components/LandingPage';
import {SpinnerComponent} from './components/SpinerComponent';
import {SearchResult} from './components/SearchResults';

it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Navbar without  crashing', () => {
  const header = document.createElement('header');
  ReactDOM.render(<NavBar />, header);
  ReactDOM.unmountComponentAtNode(header);
});

it('renders LoginPage without  crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders SignupPage without  crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignupPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders LandingPage without  crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LandingPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders SpinnerComponnent without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpinnerComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
