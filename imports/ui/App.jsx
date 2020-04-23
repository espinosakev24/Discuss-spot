import React, { Component } from 'react';
import NavBar from './NavBar.jsx'
import Feed from './Feed.jsx'

export default class App extends Component {
  
  render() {
    return <div>
      <NavBar/>
      <Feed/>
    </div>
  }
}