import { PlayersList } from '/imports/api/players.js';

const players = PlayersList.find({});

console.log( players.count() + ' players in the DB.' );

if (players.count() === 0) {

    // Adapt this fixture with "accounts" package.
    // Each player added by an user is only visible
    // to THIS user.

    const createScore = () => +(Math.random() * 100).toFixed(0);

    [
        'Fanny',
        'Maxime',
        'Rémy',
        'Arnaud',
        'Pierre',
    ].forEach( (player) => {
        PlayersList.insert({
            name, score: createScore()
        });
    });
}

console.log( players.count() + ' players in the DB.' );
