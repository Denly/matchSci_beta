//Extending Friend Collection with Posts

Template.youLike.helpers({
  youLike: function() {
    var Friend = MS.Friend.Collections.Friend;
    var Posts = MS.Posts.Collections.Posts;
    var FriArr = Friend.find({
      $and: [{
        targetPost: {
          $ne: Meteor.user().postId
        }
      }, {
        type: 'like'
      }]
    }).fetch();
    for (var i = FriArr.length - 1; i >= 0; i--) {
      _.extend(FriArr[i], Posts.findOne(FriArr[i].targetPost));
    };
    //console.log(FriArr);
    return _.sortBy(FriArr, function(FriArr) {
      return -FriArr.date;
    });
  }
});

Template.youLike.onCreated(function(){
	var _this = this;

	_this.autorun(function(){
		Meteor.subscribe("UserPost");
	});
});
