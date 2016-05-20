import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

export const Players = new Mongo.Collection('Players');


if (Meteor.isServer) {
    Meteor.publish('players', function () { // do not use arrow function
        return Players.find({ createdBy: this.userId });
    });
}


Meteor.methods({

    createPlayer({ name, score }) {

        if ( !this.userId ) { // user must be logged-in
            throw new Meteor.Error('not-authorized');
        }

        const createdBy = this.userId;

        check( name, String );
        check( score, Number );
        check( createdBy, String );

        Players.insert({ name, score, createdBy });
    },

    removePlayer( toDel ) {

        if ( !this.userId ) { // user must be logged-in
            throw new Meteor.Error('not-authorized');
        }


        // remove all players
        if ( Match.test(toDel, { all: Boolean }) ) {

            Players
                .find({ createdBy: this.userId })
                .forEach(({ _id }) => { Players.remove( _id ); });

        } else { // remove specific players

            // if param is a string, include it in an array
            // otherwise, let's say it is already an array
            const ids = Match.test(toDel, String) ? [ toDel ] : toDel;

            check( ids, [ String ] );

            ids.forEach( _id => Players.remove({ _id, createdBy: this.userId }) );
        }
    },

    updatePlayer( id, points ) {

        if ( !this.userId ) { // user must be logged-in
            throw new Meteor.Error('not-authorized');
        }

        check( id, String );
        check( points, Number );


        const player = Players.findOne({ _id: id, createdBy: this.userId });

        // if action = decrement
        if (points < 0) {
            const newScore = player.score + points;

            // avoid new score < 0
            if (newScore < 0) {
                points = points - newScore;
            }
        }

        Players.update( player, { $inc: {score: points} });
    },

});