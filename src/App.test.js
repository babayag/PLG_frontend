/*import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';
import {NavBar} from './components/NavBar';
import {LoginPage} from './components/LoginPage';
import {SignupPage} from './components/SignupPage';
import {LandingPage} from './components/LandingPage';
import {SearchBar} from './components/SearchBar';
import {EmailResult} from './components/EmailResult';

configure({adapter: new Adapter()});

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

it('should test the returnJsonObject method without crashing', () => {
  const wrapper = shallow(<SearchBar />);
  const instance = wrapper.instance();
  expect(instance.returnJsonObject("c7r7.com")).toBe(undefined);
  // expect(wrapper.state('counter')).toBe(1);
});

it('should test the returnJsonObject method without crashing', () => {
  const wrapper = shallow(<SearchBar />);
  const instance = wrapper.instance();
  expect(instance.returnJsonObject("itkamer.com")).toBe("itkamer.com.json");
  // expect(wrapper.state('counter')).toBe(1);
});

var inputForRenderingTest = [
  {
      "email": "Isidore@itkamer.com",
       "url": ["https://sfe3be30db12270da.jimcontent.com/download/version/1418461265/module/10869430589/name/Wanda%20POS%20Administrator%20Guide.pdf", "https://sfe3be30db12270da.jimcontent.com/download/version/1418461265/module/10869433089/name/Wanda%20POS%20User%20Guide.pdf"]
  }, 
  {
      "email": "isidore@itkamer.com", 
      "url": ["https://sfe3be30db12270da.jimcontent.com/download/version/1418461265/module/10869430589/name/Wanda%20POS%20Administrator%20Guide.pdf"]
  }, 
  {
      "email": "sales@itkamer.com", 
      "url": ["https://www.milesbeckler.com/products-products-product-secret-successful-marketing-answer/"]
  },
  {
      "email": "tatiotir@itkamer.com", 
      "url": ["https://sfe3be30db12270da.jimcontent.com/download/version/1418461265/module/10869433089/name/Wanda%20POS%20User%20Guide.pdf", "https://sourceforge.net/projects/tatiotir/files/iDempiere/SetupScript/"]
  },
      
  {"LastpageNbr": 100}
]

it('renders EmailResult without crashing', () => {
  var input = inputForRenderingTest[2];
  const wrapper = shallow(<EmailResult result={input}/>);
  // const instance = wrapper.instance();
  
  alert(wrapper.debug())
  console.log(wrapper.props.email)
  // wrapper.props.result = input;
  expect(wrapper.props.email).toBe("i@f.d");
  // expect(instance.returnJsonObject("itkamer.com")).toBe("itkamer.com.json");
  // expect(wrapper.state('counter')).toBe(1);
});
*/