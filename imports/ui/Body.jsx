import React, { Component } from 'react';
import Feed from './Feed.jsx'
import { Meteor } from 'meteor/meteor'
import AccountsUIWrapper from './AccountsUIWrapper.jsx'
import { withTracker } from 'meteor/react-meteor-data';


// Body component renders a different component depending whether a user is logged or not
class Body extends Component {
    render() {
        return (
            <div>
                {/* Check if a user is logged */}
                {!this.props.currentUser ?
                    <div className="row body-container">
                        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                            {/* div is the div that displays the first image in the landing view*/}
                            <div className="body-img"></div>
                        </div>

                        <div className="col-md-1 col-sm-12">&nbsp;&nbsp;</div>
                        {/* Container to wrap the main title, the description and the Get started button */}
                        <div className="col-md-5 col-sm-12 d-flex align-content-center">
                            <div className="d-flex flex-column body-right justify-content-center">
                                <h1>Join now our discussion board!</h1>
                                <p>A place to express complains, ideas, create debates and give your opinions.
                                RoundBoard is a platform that provides to its users a discussion panel to comment a global thread.
                            </p>
                                <a href="#section_2" className="btn btn-block d-flex flex-column justify-content-center">GET STARTED!</a>
                            </div>
                        </div>
                        {/* Body section 2 where is placed the accounts-ui component */}
                        <div id="section_2" className="section_2 d-flex flex-column justify-content-center align-content-center w-100">
                            <section className="d-flex flex-column justify-content-center align-content-center w-100">
                                <h1 className="text-center">Sign in or sign up to start!</h1>
                                <div className="align-self-center accounts d-flex flex-column justify-content-center">
                                    <AccountsUIWrapper />
                                </div>
                                <br />
                                <div className="align-self-center section-2-img"></div>
                            </section>
                        </div>
                    </div>


                    // If a user is logged, render the Feed component
                    :

                    <Feed />
                }
            </div>
        );
    }
}
// withTracker for detect database changes
// In this case it detects if aa user submit the accounts-ui form
export default withTracker(() => {
    return {
        currentUser: Meteor.user()
    };
})(Body);