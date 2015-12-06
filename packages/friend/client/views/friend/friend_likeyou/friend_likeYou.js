//Extending Friend Collection with Posts

Template.likeYou.helpers({
  likeYou: function() {
    var Friend = MS.Friend.Collections.Friend;
    var Posts = MS.Posts.Collections.Posts;
    var FriArr = Friend.find({
      $and: [{
        senderPost: {
          $ne: Meteor.user().postId
        }
      }, {
        type: 'like'
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

Template.likeYou.onCreated(function() {
  var _this = this;

  _this.autorun(function() {
    Meteor.subscribe("UserPost");
  });
});
