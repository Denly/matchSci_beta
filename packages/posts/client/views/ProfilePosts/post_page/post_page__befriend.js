//Insert Visit, likes form the post  

Template.profile.onCreated(function(){
if(Meteor.user()){
	var Friend = MS.Friend.Collections.Friend;
	//console.log('visited ' + Template.parentData().author);
	var thisReact = {
		type:'visit',
		senderPost: Meteor.user().postId,
		targetPost: Template.parentData()._id
	};

	var friend = Friend.findOne(thisReact,{sort:{date:-1}});	
	//console.log(friend);
		//if(!friend.visitTimes)
	if(friend){		
		var visitTimes = friend.visitTimes ? friend.visitTimes : 1;
		var count = visitTimes + 1;
		//console.log('visit again');
		//console.log(count);		
		Friend.update({_id: friend._id}, {$set:{read: false,visitTimes: count, date: new Date()}});		
		
		
	}else{
	console.log('new visit');
	Friend.insert({
		type:'visit',
		senderPost: Meteor.user().postId,
		targetPost: Template.parentData()._id,
		visitTimes: 1,
		read: false,
		date: new Date()
	});
	}

}
});
