//});


Template.friendDropdown.helpers({
  notifications: function() {
    //console.log('dropdown');
    if (Meteor.user()) {
      var Friend = MS.Friend.Collections.Friend;
      var Posts = MS.Posts.Collections.Posts;
      var FriArr = Friend.find({
        senderPost: {
          $ne: Meteor.user().postId
        }
      }).fetch();
      var dropdown = [];

      for (var i = FriArr.length - 1; i >= 0; i--) {

        var thisPost = Posts.findOne(FriArr[i].senderPost);
        dropdown[i] = {
          _id: FriArr[i]._id,
          name: thisPost.author,
          filepickerId: thisPost.filepickerId,
          senderPost: FriArr[i].senderPost,
          type: FriArr[i].type,
          read: FriArr[i].read
        };

      };
      return dropdown;
    }
  },
  notificationCount: function() {
    if (Meteor.user()) {
      return Friend.find({
        $and: [{
          senderPost: {
            $ne: Meteor.user().postId
          }
        }, {
          read: false
        }]
      }).count();
    }
  },
  allnotificationCount: function() {
    if (Meteor.user()) {
      return Friend.find({
        senderPost: {
          $ne: Meteor.user().postId
        }
      }).count();
    }
  }
});

Template.friendDropdown.events({
  'click .toAllFriend': function() {
    if (Meteor.user()) {
      Router.go("likeYou");
      console.log('likeyou')
    } else {
      Errors.throw("Please Log-in _(:з」∠)_");
    }
  }
});

Template.friendItem.helpers({ 
	notificationPostPath: function() {
			
		return this.senderPost;
	},
	light: function(){
		//read true == had read == '' no light
		return this.read ? '' : 'light' ;
	},
	HeadFilepickerId: function(){
		return this.filepickerId;
	},
	text: function(){
		//if(this.type == 'like')
			//return this.senderPost!=Meteor.user().postId 'like you';
		return (this.type == 'like') ? 'like you' : 'visited you';
	}

});

Template.friendItem.events({
  'click a': function() {
    if (Meteor.user()) {
      var x = Friend.update(this._id, {
        $set: {
          read: true
        }
      });
      Router.go("postPage", {
        _id: this.senderPost
      });
    } else {
      Errors.throw("Please Log-in _(:з」∠)_");
    }
  }
});
