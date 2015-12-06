/*
1. A btn for like and unline 
usage: {{likeBtn _id=this._id}}
if _id is null, catch Template.parentData(0) or Template.parentData(1)
*/

Template.likeBtn.helpers({
	liked: function(){

		if(Meteor.user()){
			var Friend = MS.Friend.Collections.Friend;
			var _id = this._id ? this._id : Template.parentData(0)._id;
			_id = _id ? _id : Template.parentData(1)._id;
			var haveLiked = Friend.findOne({
				type: 'like',
				senderPost: Meteor.user().postId,
				targetPost: _id
			});			
			//console.log('haveLiked');
			//console.log(haveLiked);
			return !!haveLiked;
		}else{
			return false;
		}
	}	
});



Template.likeBtn.events({
	'click .liking': function () {		
		var _id = this._id ? this._id : Template.parentData(0)._id;
			_id = _id ? _id : Template.parentData(1)._id;
		var	target = {postId: _id};
		console.log('clicked liking');

		MS.Friend.Methods.like(Meteor.user(), target);
	},
	'click .unlike': function () {	
		var Friend = MS.Friend.Collections.Friend;
		console.log('clicked unlike');
		var _id = this._id ? this._id : Template.parentData(0)._id;
			_id = _id ? _id : Template.parentData(1)._id;
			console.log('_id '+ _id);
		var id =Friend.findOne({
			type: 'like',
			senderPost: Meteor.user().postId,
			targetPost: _id,
		})._id;
		//console.log(id)
		Friend.remove(id);		
	}
});

Template.messageBtn.events({
	'click .discuss': function(){
		if(Meteor.user()){
			Router.go('messageTalk', {userId:this.userId});
		}else{
			Errors.throw("Please Sign-in or Log-in :-)");
		}
}
});
