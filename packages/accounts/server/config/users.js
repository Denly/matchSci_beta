Meteor.publish("User", function(argument){
    return Meteor.users.find(this.userId);
});
