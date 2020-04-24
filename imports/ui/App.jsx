import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.jsx'
import Body from './Body.jsx'

export default class App extends Component {
  
  render() {
    return <div>
      <NavBar/>
      <div className="container">
        <hr/>
        <Body/>
        <hr/>
      </div>
    </div>
  }
}