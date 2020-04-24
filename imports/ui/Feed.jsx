import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { CommentariesCollection } from '../api/commentaries.js'
import ReactDOM from 'react-dom';
import Commentary from './Commentary.jsx'
import { Meteor } from 'meteor/meteor';


// Feed component represents the discussion board of the application
class Feed extends Component {

    componentDidMount() {
        window.scrollTo(0,0);
    }

    // Handle the event when submitting a new comment to the feed
    handleSubmit(event) {
        event.preventDefault();

        // Avoid sending empty commentaries
        if(ReactDOM.findDOMNode(this.refs.commentaryInput).value.length != 0) {
            // Get the text from the input field
            const text = ReactDOM.findDOMNode(this.refs.commentaryInput).value.trim();
            // Call meteor insert global method
            Meteor.call('commentary.insert', text);
    
            ReactDOM.findDOMNode(this.refs.commentaryInput).value = '';
        }
    }


    getCommentaries() {
        return this.props.commentaries.map((commentary) => (
            <Commentary key={commentary._id} commentary={commentary} />
        ));
    }

    render() {
        return (
            <div className="d-flex justify-content-center feed-container">
                <div className="w-75 d-flex flex-column align-content-center">
                    <div className="form-group">
                        <h3 className="top-text">Welcome! this is the discussion board, now you can start commenting this feed!</h3>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <div className="">
                                <input
                                    placeholder="Add new commentary!"
                                    type="text"
                                    ref="commentaryInput"
                                    className="form-control comment-input w-100"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="commentaries-cont">
                        {this.getCommentaries()}
                    </div>

                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        commentaries: CommentariesCollection.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user()
    };
})(Feed);