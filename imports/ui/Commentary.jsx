import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Commentary extends Component {
    removeCommentary() {
        Meteor.call('commentary.remove', this.props.commentary._id);
    }
    render() {
        return (
            <div>
                {this.props.commentary.text} <br/>
                <button onClick={this.removeCommentary.bind(this)}>Remove</button>
            </div>
        );
    }
}