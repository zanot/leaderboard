import { PlayersList } from '/imports/api/players.js';

setTimeout(() => {

    if ( !Meteor.user() ) {
        console.warn('No user for inserting fake data.');
        return;
    }


    const currentUser = Meteor.user().username;
    const devUser = Meteor.settings.public.devUser;

    if (devUser && devUser !== currentUser) {
        console.warn('User is different from test account.');
        return;
    }


    const players = PlayersList.find();

    if (players.count() === 0) {

        const createScore = () => +(Math.random() * 100).toFixed(0);

        [
            'Fanny',
            'Maxime',
            'Rémy',
            'Arnaud',
            'Pierre',
        ].forEach( (name) => {
            PlayersList.insert({
                name,
                score: createScore(),
                createdBy: Meteor.userId(),
            });
        });

        console.info('0 to ' + players.count() + ' players in the DB.');
    }

}, 1000);
