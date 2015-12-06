//Extending Friend Collection with Posts

Template.bothLike.helpers({
  bothLike: function() {
    var Friend = MS.Friend.Collections.Friend;
    var Posts = MS.Posts.Collections.Posts;
    var YouLikeArr = Friend.find({
      $and: [{
        targetPost: {
          $ne: Meteor.user().postId
        }
      }, {
        senderPost: Meteor.user().postId
      }, {
        type: 'like'
      }]
    }).fetch();


    var BothArr = []
    for (var i = YouLikeArr.length - 1; i >= 0; i--) {
      var likeBack = {};
      likeBack = Friend.findOne({
        $and: [{
          senderPost: YouLikeArr[i].targetPost
        }, {
          type: 'like'
        }]
      });

      if (likeBack) {
        var likeBackPost = Posts.findOne(likeBack.senderPost);
        _.extend(likeBack, likeBackPost);
        BothArr.push(likeBack);
      }
    }

    return _.sortBy(BothArr, function(BothArr) {
      return -BothArr.date;
    });
  }
});

Template.bothLike.onCreated(function(){
	var _this = this;

	_this.autorun(function(){
		Meteor.subscribe("UserPost");
	});
});
