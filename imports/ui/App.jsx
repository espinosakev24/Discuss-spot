import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.jsx'
import Body from './Body.jsx'

// App component contains all the application
export default class App extends Component {

  render() {
    return <div>
      <NavBar />
      <div className="container" id="section_1">
        <hr />
        <Body />
        <hr />
      </div>
    </div>
  }
}