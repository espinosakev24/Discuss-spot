import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { CommentariesCollection } from '../api/commentaries.js'
const { format } = require('timeago.js');


class Commentary extends Component {

    getPrivateButtons() {
        if (Meteor.user()._id === this.props.commentary.owner) {
            return (
                <div>
                    <button className="btn2 btns">Edit</button>  &nbsp;
                    <button onClick={this.removeCommentary.bind(this)} className="btn1 btns">Remove</button>
                </div>
            );
        }
    }

    removeCommentary() {
        Meteor.call('commentary.remove', this.props.commentary._id);
    }
    render() {
        return (
            <div className="commentary-info">
                {/* Top of the comment box, here goes: username, edit, remove*/}
                <div className="d-flex justify-content-between">
                    <p className="username">{this.props.commentary.username}</p>
                    <div>
                        {this.getPrivateButtons()}
                    </div>
                </div>

                {/* Middle of the comment box, here goes the commentary text*/}
                <div className="main-text">
                    {this.props.commentary.text}
                </div>

                {/* bottom of the comment box, here goes the commentary date*/}
                <p className="text-right">
                    {format(this.props.commentary.createdAt).toString()}
                </p>

            </div>
        );
    }
}
export default withTracker(() => {
    return {
        commentaries: CommentariesCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
    };
})(Commentary);