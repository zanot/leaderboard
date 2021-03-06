// this "manager" must load its linked template
import './player.html';


Template.player.helpers({

    isSelected() {
        return Session.equals('selectedPlayerId', this._id)
            ? 'selected'
            : '';
    },

});


Template.player.events({

    'click .item-player'() {
        Session.set('selectedPlayerId', this._id);
    },

    'click .delete'(event) {
        // stop event bubbling to its parent
        event.stopPropagation();

        Meteor.call('removePlayer', this._id, () => {
            // reset this session var only if the player to delete
            // is the player currently selected
            if (Session.equals('selectedPlayerId', this._id)) {
                Session.set('selectedPlayerId', undefined);
            }
        });

    },

});