import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';

class NavBar extends Component {
    render() {
        return (
            <div>
                { !this.props.currentUser ?
                    <div>
                        <nav className="navbar d-flex justify-content-center align-content-center nav-container">
                            <a className="navbar-brand" href="#">
                                <div className="d-flex justify-content-center align-content-center brand-border">
                                    <div className="icon"></div> &nbsp;
                                    <div className="">
                                        RoundBoard
                                    </div>
                                </div>
                            </a>
                        </nav>
                    </div> :


                    <div>
                        <nav className="navbar d-flex justify-content-between align-content-center nav-container fixed-top">
                            <a className="navbar-brand ml-5" href="#">
                                <div className="d-flex align-content-center brand-border">
                                    <div className="icon"></div> &nbsp;
                                    <div className="">
                                        RoundBoard
                                    </div>
                                </div>
                            </a>

                            <a className="navbar-brand mr-5" href="#">
                                <div className="d-flex align-content-center brand-border">
                                    <div className="">
                                        <AccountsUIWrapper/>
                                        
                                    </div>
                                </div>
                                
                            </a>
                        </nav>
                    </div>
                }
            </div>
        );
    }
}
export default withTracker(() => {
    return {
        currentUser: Meteor.user()
    };
})(NavBar);