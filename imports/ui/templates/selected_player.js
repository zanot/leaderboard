import { Template } from 'meteor/templating';
import { PlayersList } from '/imports/api/players.js';

// this "manager" must load its linked template
import './selected_player.html';


// must use normal anonymous function,
// because arrow function keep global context for "this"
Template.selected_player.onCreated(function () {
    this.playerId = undefined;
    this.points = 5;
});


Template.selected_player.helpers({

    getPoints() {
        return Template.instance().points;
    },

    playerSelected() {
        const instance = Template.instance();

        instance.playerId = Session.get('selectedPlayerId');

        return PlayersList.findOne( instance.playerId );
    },

});


Template.selected_player.events({

    'click .delete'(event, instance) {
        PlayersList.remove( instance.playerId );

        delete instance.playerId;
        Session.set('selectedPlayerId', undefined);
    },

    'click .increment'(event, instance) {
        if ( !instance.playerId ) {
            return;
        }

        PlayersList.update( instance.playerId, {
            $inc: { score: instance.points },
        });
    },

    'click .decrement'(event, instance) {
        if ( !instance.playerId ) {
            return;
        }

        PlayersList.update( instance.playerId, {
            $inc: { score: -instance.points },
        });
    },

});
