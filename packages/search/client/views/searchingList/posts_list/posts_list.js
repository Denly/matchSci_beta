var INCREMENE_POST = 2;

Template.postsList.helpers({
  posts: function() {
    return MS.Posts.Collections.Posts.find(Session.get('searchingSelector'), {
      sort: {
        submitted: -1
      }
    });
  }
});

Template.postsList.onRendered(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      console.log("enter scroll");
      Session.set("postLimit", Session.get('postLimit') + INCREMENE_POST);
    }
  });
});

Template.postsList.onCreated(function() {
  var _this = this;
  Session.set('postLimit', 4);

  _this.autorun(function(){
    var arg = {select:{}, opt:{}};
    arg.select = Session.get('searchingSelector');
    arg.opt.limit = Session.get('postLimit');
    console.log('ARG is');
    console.log(arg);
    Meteor.subscribe('postsListMatch', arg);
  });
});
