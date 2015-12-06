//control the Meteor.user()
Meteor.publish("userData", function() {
  return Meteor.users.find({
    _id: this.userId
  }, {
    fields: {
      'username': 1,
      'postId': 1,
      'profile': 1
    }
  });
});

//Posts of the user's own post
Meteor.publish('UserPost', function() {
  return MS.Posts.Collections.Posts.find({
    userId: this.userId
  });
});

//Posts of searching result
Meteor.publish('postsListMatch', function(arg) {
  //check([limit], [Number]);
    check(arg, Object);
    arg.opt.fields = {userId: 1, filepickerId: 1, author: 1, submitted: 1,Online:1,address:1}; //cut off uneccesary obj
    arg.opt.sort = {submitted: -1};
    console.log(arg);
    var Posts = MS.Posts.Collections.Posts.find(arg.select, arg.opt);
    console.log(Posts.count());
    return Posts;
});

//Posts of single postPage
Meteor.publish('singlePost', function(id) {
  check(id, String);
  var opt = {};
  opt.fields = {
    searchConfig: 0
  };
  return MS.Posts.Collections.Posts.find(id);
});

//Posts of MessageTalk so anyone can talk to stranger
Meteor.publish('PostsForMessageTalk', function(userId) {
  check(userId, String);
  var opt = {};
  opt.fields = {
    myInfo: 0,
    lookingFor: 0,
    weekend: 0,
    interesting: 0,
    summary: 0,
    searchConfig: 0
  };
  return MS.Posts.Collections.Posts.find({
    userId: userId
  }, opt);
});


//Friend reactions which relate to the user
Meteor.publish('UserLikeNotification', function() {
  var user = Meteor.users.findOne(this.userId);
  if (user) {
    var userPostId = user.postId;
    var Friends = MS.Friend.Collections.Friend.find({
      $or: [{
        senderPost: userPostId
      }, {
        targetPost: userPostId
      }]
    });
    var postIdArr = getTargetPostIdForFriend(Friends.fetch(), this.userId);
    var Posts = MS.Posts.Collections.Posts.find({_id: {$in: postIdArr}}, {fields: {'filepickerId':1, 'author':1, 'userId':1}});
    return [Friends, Posts];
  }
});
function getTargetPostIdForFriend(arr, userId){
  var fieldArr = [];
  var userPostId = Meteor.users.findOne(userId).postId;
  var postId;
  _.each(arr, function(obj){
    postId = (obj.senderPost == userPostId) ? obj.targetPost : obj.senderPost;
    fieldArr.push(postId);
  });
  return fieldArr;
}

//Ans
Meteor.publish('Ans', function() {
  return MS.Timeline.Collections.Ans.find();
});
//Ans
Meteor.publish('AnsByIssueIdAndPostId', function(issueIdArr, postIdArr) {
  return MS.Timeline.Collections.Ans.find({
    postId: {
      $in: postIdArr
    },
    issueId: {
      $in: issueIdArr
    }
  });
});

//TimelineByLimit
Meteor.publish('TimelineByLimit', function(limit) {
  check(limit, Number);
  return MS.Timeline.Collections.Timeline.find({}, {
    limit: limit,
    sort: {
      submitted: -1
    }
  });
});

Meteor.publish('TimelineByOption', function(opt) {
  check(opt, Object);
  if (!opt.limit)
    return [];
  var Timelines;
  var Posts;
  var option = {limit: opt.limit, sort: {submitted: -1}};
  var selector = {};
  if(opt.info){
  opt.info = opt.info.toLowerCase();
  selector = {postId: opt.postId};
  }
  //console.dir(opt);
  //Meteor._sleepForMs(2000);
  
    if (opt.info == 'photo') {
      selector.type = 'news';
      selector.filepickerId = {$ne: null};
      
    } else if (opt.info == 'issue') {
      selector.type = 'issue';
      
    } else if (opt.info == 'posts') {
      selector.type = 'news';
      
    } 
      Timelines = MS.Timeline.Collections.Timeline.find(selector, option);
      var postIdArr = getFieldArr(Timelines.fetch(), 'postId');
      Posts = MS.Posts.Collections.Posts.find({_id: {$in: postIdArr}}, {fields: {'filepickerId':1, 'author':1}});
      return [Timelines, Posts];
    
  
});
function getFieldArr(arr, field){
  var fieldArr = [];
  _.each(arr, function(obj){
    fieldArr.push(obj[field]);
  });
  return fieldArr;
}

//user's MessageList
Meteor.publish('MessageList', function() {
  var MessageList = MS.Message.Collections.MessageList.find({
    $or: [{
      to: this.userId
    }, {
      from: this.userId
    }]
  }, {
    sort: {
      submitted: -1
    }
  });
  var postIdArr = getTargetPostId(MessageList.fetch(), this.userId);
  //console.log(postIdArr);
  var Posts = MS.Posts.Collections.Posts.find({_id: {$in: postIdArr}}, {fields: {'filepickerId':1, 'author':1, 'userId':1}});
  return [MessageList, Posts];
});
function getTargetPostId(arr, userId){
  var fieldArr = [];
  var postId;
  _.each(arr, function(obj){
    postId = (obj.to == userId) ? obj.fromPostId : obj.toPostId;
    fieldArr.push(postId);
  });
  return fieldArr;
}

//user's Message
Meteor.publish('Message', function(obj) {
  check(obj, {
    userId: String,
    limit: Number
  });
  //console.log('Message publishing');
  //console.dir(obj);
  /*console.log(MS.Message.Collections.Message.find(
      {$or:[{$and:[{from:this.userId},{to:obj.userId}]}, {$and:[{to:this.userId},{from:obj.userId}]} ]},
      {sort:{submitted: -1}, limit: obj.limit}).fetch());
      */
  //Meteor._sleepForMs(1000);
  return MS.Message.Collections.Message.find({
    $or: [{
      $and: [{
        from: this.userId
      }, {
        to: obj.userId
      }]
    }, {
      $and: [{
        to: this.userId
      }, {
        from: obj.userId
      }]
    }]
  }, {
    sort: {
      submitted: -1
    },
    limit: obj.limit
  }); //sort:{submitted: -1} Send the newest Msg first
});


//Don't use these except testing
//AllPosts
Meteor.publish('AllPosts', function() {
  var opt = {};
  opt.fields = {
    summary: 0,
    searchConfig: 0
  };
  console.log('published Allpost');
  return MS.Posts.Collections.Posts.find({}, opt);
});

//AllTimeline
Meteor.publish('Timeline', function() {
  return MS.Timeline.Collections.Timeline.find();
});
