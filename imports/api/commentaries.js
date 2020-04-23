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
        });
    },
    'commentary.remove'(commentaryId) {
        check(commentaryId, String);

        CommentariesCollection.remove(commentaryId);
    }
});
