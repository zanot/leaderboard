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

        Meteor.call('createPlayer', { name, score });


        // reset field
        input.value = '';
    },

});