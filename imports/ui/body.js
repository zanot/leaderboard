
// this "manager" must load its linked template
import './body.html';

// this template use templates, load their "managers"
import './templates/add_player_form.js';
import './templates/players_list.js';
import './templates/selected_player.js';


Template.body.helpers({

    userHasSelectedPlayer() {
        return Session.equals('selectedPlayerId', undefined) ? false : true;
    },

});