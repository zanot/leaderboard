import { PlayersList } from '/imports/api/players.js';

import '/imports/startup/client/accounts-config.js';

// this template use templates, load their "managers"
import '/imports/ui/templates/add_player_form.js';
import '/imports/ui/templates/players_list.js';
import '/imports/ui/templates/selected_player.js';


Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('players');
    // Meteor.subscribe('players', Meteor.userId() ); // try it by passing current user id
});


Template.body.helpers({

    userHasSelectedPlayer() {
        return Session.equals('selectedPlayerId', undefined) ? false : true;
    },

});


Template.body.events({

    'click .delete-all'() {
        PlayersList
            .find() // data already filtered by the server
            .forEach(({ _id }) => { PlayersList.remove( _id ); });

        // make sure that user's selection is cleared
        Session.set('selectedPlayerId', undefined);
    },

});