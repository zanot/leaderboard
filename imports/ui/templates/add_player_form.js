import { PlayersList } from '/imports/api/players.js';

import './add_player_form.html';


Template.add_player_form.events({

    'submit form'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        const input = event.target['player-name'];
        const name  = input.value;

        if ( !name ) {
            return;
        }

        // get random int
        const score = +(Math.random() * 100).toFixed(0);
        const createdBy = Meteor.userId();

        // TODO
        // check result of insert before
        // incrementing the nb of players

        PlayersList.insert({ name, score, createdBy });

        // reset field
        input.value = '';
    },

});