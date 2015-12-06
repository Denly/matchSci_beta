MS.Posts.Collections.Posts = new Mongo.Collection('posts');

if(Meteor.isClient && !Meteor.user()){
  //Let guests can use some functions
  MS.Posts.Collections.ClientPosts = new Mongo.Collection(null);
  MS.Posts.Collections.ClientPosts.insert({
  	author: 'guest',
  	searchConfig: MS.Posts.Objects.defaultSearchConfig
  });

}
MS.Posts.Functions.createPost = function(user, post){ 
  console.log('createpost');

  if(!user.postId){
  var finalPost = MS.Posts.Functions.getBlankPost();
  //merge post to blank post
  _.extend(finalPost, post);
  //console.dir(finalPost);

  //merge user data to  post
  var postDataFromUser = {
  	userId: user._id,
  	author: user.username,
  	filepickerId: user.profile.filepickerId ? user.profile.filepickerId : 'skywtYkRhuNbJLJe3cAz',
  };
  _.extend(finalPost, postDataFromUser);
  
  //insert post to Mogodb
  var postId = MS.Posts.Collections.Posts.insert(finalPost);
  if(postId){
        //var update = Meteor.users.update({_id: user._id}, {$set:{ postId: postId}});
        //console.log('Meteor.users.update'+update);
        return postId;
    }else{
    	console.log('fail to create new post');
    	return false;
    }
}
console.log('user already has a post');
return false;
}

MS.Posts.Functions.getBlankPost = function(){ 
	return {
		userId: '',
		author: '',
		summary: "Hi I'm new here. I'll finish my summary soon!",
		interesting: '',
		weekend: '',
		submitted: new Date(),
		filepickerId: 'skywtYkRhuNbJLJe3cAz',
		position: 'default',
		location: {
			type: "Point",
			coordinates: [-71.0571571, 42.3133735]
		},
		lookingFor: MS.Posts.Objects.defaultLookingfor,
		myInfo: MS.Posts.Objects.defaultMyInfo,
		searchConfig: MS.Posts.Objects.defaultSearchConfig
	};
}

MS.Posts.Functions.updateMyInfoObject = function(post, myInfoArr){
	//var post = MS.Posts.Collections.Posts.findOne('8rutvoxoiESYKo554');
	_.each(myInfoArr, function(newInfo){
		var match = _.find(post.myInfo, function(i) { return i.item == newInfo.item });
		if (match) {
			match.value = newInfo.value;
		}	
	});
	//console.log(post);
	return post;
}