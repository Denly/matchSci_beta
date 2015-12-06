Template.newsPage.onCreated(function(){
   // 1. Initialization

  var instance = this;

  // initialize the reactive variables
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(2);
  instance.hasMorePosts = function () {
    //console.log(instance.Timeline().count() >= instance.limit.get());
    return instance.Timeline().count() >= instance.limit.get();
  };
  // 2. Autorun

  // will re-run when the "limit" reactive variables changes
  instance.autorun(function () {
    var opt = {
    postId: Router.current().params._id, //grab profile id
    info: Router.current().params.info, //grab what what to show in profile page's timeline
    limit: instance.limit.get()
  };
    // get the limit
    var limit = instance.limit.get();

    //console.log("Asking for "+limit+" issue…");

    // subscribe to the posts publication
    var subscription = instance.subscribe('TimelineByOption', opt);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      //console.log("> Received "+limit+" timeline. \n\n")
      instance.loaded.set(limit);
    } else {
      //console.log("> Subscription is not ready yet. \n\n");
    }
  });

  instance.Timeline = function() { 
    return MS.Timeline.Collections.Timeline.find({}, {sort:{submitted: -1}, limit: instance.loaded.get()});
  };
});


Template.newsPage.onRendered(function() {
  var instance = this;
  // is triggered every time we scroll
  $(window).scroll(function() {
    if(instance.hasMorePosts())
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    // get current value for limit, i.e. how many posts are currently displayed
    var limit = instance.limit.get();
    // increase limit by 5 and update it
    limit += 2;
    instance.limit.set(limit);
    }
  });
});


Template.newsPage.helpers({
	newsStream: function () {
    return Template.instance().Timeline();
	},
	hasMorePosts: function () {
    return Template.instance().hasMorePosts();
  }
});


Template.newsPage.events({
  'click .load-more': function (event, instance) {
    event.preventDefault();
    var limit = instance.limit.get();

    // increase limit by 5 and update it
    limit += 2;
    instance.limit.set(limit);
  }
});
