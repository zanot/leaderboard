import { PlayersList } from '../../api/players.js';

import './add_player_form.html';


Template.add_player_form.events({

    'submit form'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        const input = event.target['player-name'];

        // get int between 0 and 9
        const score = Math.random().toFixed(1) * 10;
        const name  = input.value;

        if ( !name ) {
            return;
        }

        // check result of insert before
        // incrementing the nb of players
        PlayersList.insert({ name, score });

        // reset field
        input.value = '';
    },

});