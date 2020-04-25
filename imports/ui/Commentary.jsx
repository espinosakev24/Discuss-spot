import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { CommentariesCollection } from '../api/commentaries.js'
import ReactDOM from 'react-dom';
const { format } = require('timeago.js');


// Commentary component stores features of each commentary box
class Commentary extends Component {

    state = {
        isInEditMode: false
    }

    // Method to get remove and edit buttons
    // This buttons only going to be available for the owner of the commantary
    getPrivateButtons() {
        if (Meteor.user()._id === this.props.commentary.owner) {
            if (!this.state.isInEditMode) {
                // return default buttons - remove and edit
                return (
                    <div>
                        <button className="btn2 btns" onClick={this.changeEditMode.bind(this)}>Edit</button>  &nbsp;
                        <button onClick={this.removeCommentary.bind(this)} className="btn1 btns">Remove</button>
                    </div>
                );
                // return edit mode buttons - save and cancel
            } else {
                return (
                    <div>
                        <button className="btn2 btns" onClick={this.updateTextValue.bind(this)}>Save</button>  &nbsp;
                        <button onClick={this.changeEditMode.bind(this)} className="btn1 btns">Cancel</button>
                    </div>
                );
            }
        }
    }

    // Method to update the commentary text
    updateTextValue() {
        this.changeEditMode();
        const newText = ReactDOM.findDOMNode(this.refs.newTextInput).value.trim();
        // call global Meteor method - update
        Meteor.call('commentary.update', this.props.commentary._id, newText);
    }

    // Method to change the state variable isInEdit when the edit button is pressed
    changeEditMode() {
        this.setState({ isInEditMode: !this.state.isInEditMode });
    }

    // Method to remove the commentary text
    removeCommentary() {
        // call global Meteor method - remove
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
                {!this.state.isInEditMode ?
                    <div className="main-text" ref="currentText">
                        {this.props.commentary.text}
                    </div> :

                    <div className="main-text">
                        <textarea type="text" defaultValue={this.props.commentary.text} ref="newTextInput" className="w-100 form-control"></textarea>
                    </div>
                }

                {/* bottom of the comment box, here goes the commentary date*/}
                <p className="text-right">
                    {format(this.props.commentary.createdAt).toString()}
                </p>

            </div>
        );
    }
}
// Get all commentaries in the data base and the current user logged
export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(Commentary);