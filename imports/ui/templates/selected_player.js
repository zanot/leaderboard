import { Template } from 'meteor/templating';
import { Players } from '/imports/api/Players.js';

// this "manager" must load its linked template
import './selected_player.html';


// must use normal anonymous function for templates callbacks
// because arrow function keep global context for "this"
Template.selected_player.onCreated(function () {
    this.playerId = undefined;
    this.points = 5;
});

Template.selected_player.onDestroyed(function () {
    delete this.playerId;
});



Template.selected_player.helpers({

    getPoints() {
        return Template.instance().points;
    },

    playerSelected() {
        const instance = Template.instance();

        instance.playerId = Session.get('selectedPlayerId');

        return Players.findOne( instance.playerId );
    },

});



Template.selected_player.events({

    'click .delete'(event, instance) {
        Meteor.call('removePlayer', instance.playerId, () => {
            Session.set('selectedPlayerId', undefined);
        });
    },

    'click .increment'(event, instance) {
        if ( !instance.playerId ) {
            return;
        }

        Meteor.call('updatePlayer', instance.playerId, instance.points);
    },

    'click .decrement'(event, instance) {
        if ( !instance.playerId ) {
            return;
        }

        Meteor.call('updatePlayer', instance.playerId, -instance.points);
    },

});
