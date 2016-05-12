import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const PlayersList = new Mongo.Collection('players');

if (Meteor.isServer) {
    Meteor.publish('players', function () { // do not use arrow function
        return PlayersList.find({ createdBy: this.userId });
    });
}