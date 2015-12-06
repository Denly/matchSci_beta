//"this."" is point to user's Posts who is talking to
Template.messageTalk.helpers({
  talkto: function() {
    return this.author;
  },
  'HeadFilepickerId': function() {
    if (this.filepickerId) {
      return this.filepickerId;
    } else {
      return 'skywtYkRhuNbJLJe3cAz';
    }
  }

});

Template.talk.helpers({
  'HeadFilepickerId': function() {
    var from = this.from;
    var userId = Meteor.userId();
    if (from == userId) {
      var filepickerId = Meteor.user().profile.filepickerId;

    } else {
      var filepickerId = Template.parentData().filepickerId;
    }

    if (filepickerId) {
      return filepickerId;
    } else {
      return 'skywtYkRhuNbJLJe3cAz';
    }
  }

});
