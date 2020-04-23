import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { CommentariesCollection } from '../api/commentaries.js'
import ReactDOM from 'react-dom';
import Commentary from './Commentary.jsx'
import { Meteor } from 'meteor/meteor';


// Feed component represents the discussion board of the application
class Feed extends Component {

    // Handle the event when submitting a new comment to the feed
    handleSubmit(event) {
        event.preventDefault();
        // Get the text from the input field
        const text = ReactDOM.findDOMNode(this.refs.commentaryInput).value.trim();
        // Call meteor insert global method
        Meteor.call('commentary.insert', text);

        ReactDOM.findDOMNode(this.refs.commentaryInput).value = '';
    }


    getCommentaries() {
        return this.props.commentaries.map((commentary) => (
            <Commentary key={commentary._id} commentary={commentary}/>
        ));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input
                        placeholder="Add new commentary!"
                        type="text"
                        ref="commentaryInput"
                    />
                </form>
                {this.getCommentaries()}
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        commentaries: CommentariesCollection.find({}, {sort: {createdAt: -1}}).fetch(),
    };
})(Feed);