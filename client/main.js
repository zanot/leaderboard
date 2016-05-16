import '/imports/startup/client/accounts-config.js';

// this template use templates, load their "managers"
import '/imports/ui/templates/add_player_form.js';
import '/imports/ui/templates/players_list.js';
import '/imports/ui/templates/selected_player.js';


Template.body.onCreated(function () {
    Meteor.subscribe('players');
});


Template.body.helpers({

    userHasSelectedPlayer() {
        return Session.equals('selectedPlayerId', undefined) ? false : true;
    },

});


Template.body.events({

    'click .delete-all'() {
        Meteor.call('removePlayer', { all: true }, () => {
            // make sure that user's selection is cleared
            Session.set('selectedPlayerId', undefined);
        });

    },

});