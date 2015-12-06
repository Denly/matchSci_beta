//Extending Friend Collection with Posts

Template.visitor.helpers({
  visitor: function() {
    var Friend = MS.Friend.Collections.Friend;
    var Posts = MS.Posts.Collections.Posts;
    var FriArr = Friend.find({
      $and: [{
        senderPost: {
          $ne: Meteor.user().postId
        }
      }, {
        type: 'visit'
      }]
    }).fetch();
    for (var i = FriArr.length - 1; i >= 0; i--) {
      _.extend(FriArr[i], Posts.findOne(FriArr[i].senderPost));
    };
    //console.log(FriArr);
    return _.sortBy(FriArr, function(FriArr) {
      return -FriArr.date;
    });
  }
});

Template.visitor.onCreated(function() {
  var _this = this;

  _this.autorun(function() {
    Meteor.subscribe("UserPost");
  });
});
