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
                <div className="row">
                    <div className="col-7">
                        <div className="body-img"></div>
                    </div>


                    <div className="col-5">
                        <div className="text-center d-flex flex-column body-right">
                            <h1>Join our discussion board!</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique est, porro alias iusto voluptatum repellat, neque commodi quod quam nulla molestias perspiciatis tempore cumque odio reprehenderit quo dolorum ipsa nesciunt?</p>
                            <button className="btn btn-block">GET STARTED!</button>
                            <AccountsUIWrapper/>
                        </div>
                    </div>
                </div> :

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