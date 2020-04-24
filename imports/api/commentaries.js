import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// Create a new mongodb collection
export const CommentariesCollection = new Mongo.Collection('commentaries');

// Define global meteor methods
Meteor.methods({
    'commentary.insert'(text){
        check(text, String);

        CommentariesCollection.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'commentary.remove'(commentaryId) {
        check(commentaryId, String);

        CommentariesCollection.remove(commentaryId);
    },
    'commentary.update'(commentId, newText) {
        CommentariesCollection.update(commentId, {$set: {text: newText}});
    }
});
