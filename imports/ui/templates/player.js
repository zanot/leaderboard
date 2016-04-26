import { PlayersList } from './../../api/players.js';

// this "manager" must load its linked template
import './player.html';


Template.player.helpers({

    selected() {
        return Session.equals('selectedPlayerId', this._id)
            ? 'selected'
            : '';
    },

});


Template.player.events({

    'click .item-player'() {
        // save player id
        Session.set('selectedPlayerId', this._id);
    },

    'click .delete'(event) {
        // stop event bubbling to its parent
        event.stopPropagation();

        PlayersList.remove( this._id );
        Session.set('selectedPlayerId', undefined);
    },

});