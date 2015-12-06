Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function() {
        Router.go('postPage', {_id: Meteor.user().postId});
    }
});