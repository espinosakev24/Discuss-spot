import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { CommentariesCollection } from '../api/commentaries.js'
import ReactDOM from 'react-dom';
const { format } = require('timeago.js');


class Commentary extends Component {

    state = {
        isInEditMode: false
    }

    getPrivateButtons() {
        if (Meteor.user()._id === this.props.commentary.owner) {
            if (!this.state.isInEditMode){
                return (
                    <div>
                        <button className="btn2 btns" onClick={this.changeEditMode.bind(this)}>Edit</button>  &nbsp;
                        <button onClick={this.removeCommentary.bind(this)} className="btn1 btns">Remove</button>
                    </div>
                );
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

    updateTextValue() {
        this.changeEditMode();
        const newText = ReactDOM.findDOMNode(this.refs.newTextInput).value.trim();
        Meteor.call('commentary.update', this.props.commentary._id, newText);
    }

    changeEditMode() {
        this.setState({isInEditMode: !this.state.isInEditMode});
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
export default withTracker(() => {
    return {
        commentaries: CommentariesCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
    };
})(Commentary);