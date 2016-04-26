import { PlayersList } from '../../api/players.js';

// this "manager" must load its linked template
import './selected_player.html';



Template.selected_player.helpers({

    visibility() {
        return '';
    },

    player() {
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
            $inc: { score: 1 },
        });
    },

    'click .decrement'(event, instance) {
        if ( !instance.playerId ) {
            return;
        }

        PlayersList.update( instance.playerId, {
            $inc: { score: -1 },
        });
    },

});