
Router.route('/posts/:_id/:info', {
  name: 'postPageInfo',
  template: 'postPage',
  waitOn: function () {
    var opt = {
      info: this.params.info,
      postId: this.params._id

    };
    return [//subscribe Timeline at Template level, so it can be reactive
      Meteor.subscribe('singlePost', this.params._id, {
        onReady: function () {
          console.log('singlePost OnReady');
        }
      })
    ];
  },
  data: function () {
    return MS.Posts.Collections.Posts.findOne(this.params._id);
  }
});

