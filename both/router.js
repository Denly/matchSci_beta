var Posts = MS.Posts.Collections.Posts;

/*PostsListController = RouteController.extend({
  template: 'postsList',
  subscriptions: function() { //callback for loading icon
    Meteor.subscribe('postsListMatch', Session.get('postLimit'));
  }
});*/

Router.route('/intros', {
  name: 'intros'
});

Router.route('/', {
  name: 'newsPage',
  template: 'newsPage',
  waitOn: function() {
    //Meteor.subscribe('TimelineByLimit', 3);
  }
}); //Meteor.subscribe('Posts'),

Router.route('/match', function() {
  this.render('postsList');
}, {
  name: 'postsList'
});


Router.route('/posts/:_id',
  function() {
    Router.go('postPageInfo', {
      _id: this.params._id,
      info: "Summary"
    });
  }, {
    name: 'postPage'
  }
);
Router.route('/messageList', {
  name: 'messageList'
});

Router.route('/message/:userId', {
  name: 'messageTalk',
  waitOn: function() {
    //console.log('messageTalk data');
    //console.log(this.params.userId);
    return [Meteor.subscribe('PostsForMessageTalk', this.params.userId)];
  },
  data: function() {

    //console.log('data is ');
    //console.log(Posts.findOne({userId: this.params.userId}).author);
    var data = Posts.findOne({
      userId: this.params.userId
    });
    //console.log('messageTalk data');
    //console.log(data);
    return data;
  }
});
//1.核對Post裡有沒有此userId
//2.return findOne找到的data, 讓template有this(data context)用
//if not, pagenotfind

Router.route('/friend/visitor', {
  name: 'visitor'
});

Router.route('/friend/youlike', {
  name: 'youLike'
});

Router.route('/friend/likeyou', {
  name: 'likeYou'
});


Router.route('/friend/bothlike', {
  name: 'bothLike'
});

var requireLogin = function() {

  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {
  only: 'messageTalk'
});
Router.onBeforeAction('dataNotFound', {
  only: 'postPage'
});
Router.onBeforeAction('dataNotFound', {
  only: 'postPageInfo'
});
Router.onBeforeAction('dataNotFound', {
  only: 'postEdit'
});
Router.onBeforeAction(requireLogin, {
  only: ['postSubmit', 'messageTalk', 'messageList', 'youLike', 'likeYou', 'submit', 'visitor']
});
