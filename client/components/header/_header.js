Template.header.events({
  "click #open-subscriptions": function(event, template) {
    var instance = Template.instance();
    if (Meteor.user()) {
      Blaze.render(Template.subscriptionModal, document.body);
    } else {
      toastr.warning("Please Login")
    }
  }
});

Template.header.helpers({
	isUser: function(){return Meteor.user();}
})