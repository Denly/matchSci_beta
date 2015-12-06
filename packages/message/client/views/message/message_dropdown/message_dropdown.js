Template.notifications.helpers({ 
	notifications: function() {
		return MS.Message.Collections.MessageList.find({$or:[{to: Meteor.userId()}, {from: Meteor.userId()}]}, {sort:{submitted: -1}}); },
	notificationCount: function(){
		return MS.Message.Collections.MessageList.find({to: Meteor.userId(), read: false}).count();},
	allnotificationCount: function(){
		return MS.Message.Collections.MessageList.find({$or:[{to: Meteor.userId()}, {from: Meteor.userId()}]}).count();
	}

});

Template.notificationItem.helpers({ 
	notificationPostPath: function() {
		var talkto;
		if(Meteor.userId()==this.from){
				talkto = this.to;
			}else{
				talkto = this.from;
			}
			//console.log('talkto is '+talkto);
		//return Router.routes.messageTalk.path({userId: talkto}); 
	},
	light: function(){
		//read true == had read == '' no light
		return ((this.read)||(this.from===Meteor.userId())) ? '' : 'light' ;
	},
	shortText: function(){
		if(this.text.length>5){
			return this.text.slice(0,5)+"...";
		}else{
			return this.text.slice(0,5);
		}
	},
	HeadFilepickerId: function(){
		var Posts = MS.Posts.Collections.Posts;
		if(this.from == Meteor.userId()){
		//console.log(Posts.findOne({userId: this.to}));
			//console.log('this to '+ this.to +' name ' + this.toName);
			if(Posts.findOne({userId: this.to}))
			return Posts.findOne({userId: this.to}).filepickerId;
		}else{
			//console.log('this fr '+ this.from +' name ' + this.fromName);
			if(Posts.findOne({userId: this.from}))
			return Posts.findOne({userId: this.from}).filepickerId;
		}
	},
	talkto: function(){
		if(this.from == Meteor.userId()){
			return this.toName;
		}else{
			return this.fromName;
		}
	},
	from_re: function(){
		if(this.from == Meteor.userId()){
			return 'To ';
		}else{
			return 'From ';
		}
	}
});

Template.notificationItem.events({ 
	'click a': function() {
		var target = getTarget(this, Meteor.userId());
		console.log('target');console.log(target);
		Session.set('chatBubble', {targetName: target.name, targetUserId: target.userId, targetPostId:target.postId, open: true});
		MS.Message.Collections.MessageList.update(this._id, {$set: {read: true}}); 
	}
});

Template.toAllMessage.events({
	'click a': function () {
		var userId = getTarget(MS.Message.Collections.MessageList.findOne()).userId;
		Router.go('messageTalk',{userId: userId});
	}
});

function getTarget(msgList, userId){
	if(msgList.from == userId){
			return {name: msgList.toName, userId: msgList.to, postId: msgList.toPostId};
		}else{
			return {name: msgList.fromName, userId: msgList.from, postId: msgList.fromPostId};
		}
}

