var ITEMS_INCREMENT = 1;
Template.messageList.onCreated(function() {
  Session.set('messageLimit', 3)
  this.subscribe('MessageList');
});

Template.messageList.events({
  "click #load_more": function(event, template) {
    Session.set("messageLimit", Session.get('messageLimit') + ITEMS_INCREMENT);
  }
});

Template.messageList.onRendered(function() {

  jQuery(function($) {
    $('.messageListClass').on('scroll', function() {
      if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
        console.log("scroll");
        Session.set("messageLimit", Session.get('messageLimit') + ITEMS_INCREMENT);
      }
    })
  });
});

Template.messageList.helpers({
  messageList: function() {
    return MS.Message.Collections.MessageList.find({
      $or: [{
        to: Meteor.userId()
      }, {
        from: Meteor.userId()
      }]
    }, {
      limit: Session.get('messageLimit')
    });
  }
});
