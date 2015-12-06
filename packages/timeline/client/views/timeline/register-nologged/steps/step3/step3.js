/**
The user account and blank profile should be
established after step3 is done

*/

Template.step3.onCreated(function(){
	//this.subscription('AllPosts');
});

Template.step3.helpers({
	headImgData: function () {
		/*var PostArr = MS.Posts.Collections.Posts.find().fetch();
		_.each(PostArr, function (post, i) {
			PostArr[i] = post.filepickerId;
		});
		//console.log('arr');*/
		//console.log(PostArr);
		return MS.Posts.Collections.Posts.find({},{limit:8});
	}
});
Template.step3.events({
	'click .skip': function () {
		console.log('click');
		Session.set("questionStep",false);
		delete Session.keys['regStep'];
	}
});
/*
Template.headImg.helpers({
	HeadFilepickerId: function () {
		// ...
	}
});*/