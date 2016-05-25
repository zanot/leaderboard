// we need to manipulate Tasks collection so we import it
import { Players } from '/imports/api/Players.js';

// this "manager" must load its linked template
import './players_list.html';

// this template use templates, load their "managers"
import './player.js';

// import '/imports/startup/client/insert-fake-data.js';


Template.players_list.helpers({

    nbPlayers() {
        return Players.find().count(); // data already filtered by the server
    },

    players() {
        return Players.find({}, {
            // sort on score DESC, and name ASC
            sort: { score: -1, name: 1 },
        });
    },

});