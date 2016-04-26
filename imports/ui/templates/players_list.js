// we need to manipulate Tasks collection so we import it
import { PlayersList } from './../../api/players.js';

// this "manager" must load its linked template
import './players_list.html';

// this template use templates, load their "managers"
import './player.js';


Template.players_list.helpers({

    nbPlayers() {
        return PlayersList.find().count();
    },

    players() {
        return PlayersList.find({}, {
            // sort on score DESC, and name ASC
            sort: { score: -1, name: 1, },
        });
    },

});