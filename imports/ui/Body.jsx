import React, { Component } from 'react';
import Feed from './Feed.jsx'
import { Meteor } from 'meteor/meteor'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import { withTracker } from 'meteor/react-meteor-data';

class Body extends Component {
    render() {
        return (
            <div>
            { !this.props.currentUser ?
                <div className="row body-container">
                    <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                        <div className="body-img"></div>
                    </div>

                    <div className="col-md-1 col-sm-12">&nbsp;&nbsp;</div>

                    <div className="col-md-5 col-sm-12 d-flex align-content-center">
                        <div className="d-flex flex-column body-right justify-content-center">
                            <h1>Join now our discussion board!</h1>
                            <p>One place to express complains, ideas, create debate and to give opinions.
                                RoundBoard is platform that provides to its users a discussion panel to comment a global thread.
                            </p>
                            <a href="#section_2" className="btn btn-block d-flex flex-column justify-content-center">GET STARTED!</a>
                        </div>
                    </div>

                    <div id="section_2" className="section_2 d-flex flex-column justify-content-center align-content-center w-100">
                        <section className="d-flex flex-column justify-content-center align-content-center w-100">
                            <h1 className="text-center">Sign in or sign up to start!</h1>
                            <div className="align-self-center accounts d-flex flex-column justify-content-center">
                                <AccountsUIWrapper/>
                            </div>
                            <br/>
                            <div className="align-self-center section-2-img"></div>
                        </section>
                    </div>
                </div>

                
                
                :

                <Feed/>
            }
            </div>
        );
    }
}
export default withTracker(() => {
    return {
        currentUser: Meteor.user()
    };
})(Body);