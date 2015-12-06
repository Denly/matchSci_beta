Template.chatBubble.helpers({
	bubble: function(){
		obj = Session.get('chatBubble');
		return MS.Message.Collections.Message.find(
      	{$or:[{$and:[{from:Meteor.userId()},{to:obj.targetUserId}]}, {$and:[{to:Meteor.userId()},{from:obj.targetUserId}]} ]}, 
      	{sort:{submitted: 1}});
	},
	targetName: function(){
		if(Session.get('chatBubble'))
		return Session.get('chatBubble').targetName;
	},
	open: function(){
		Session.get('chatBubble')
		return Session.get('chatBubble').open;
	}
});

Template.chatBubble.events({
	'click .header': function () {
		var chatBubble = Session.get('chatBubble');
		chatBubble.open = !chatBubble.open;
		Session.set('chatBubble', chatBubble);
	},
	'click .header a': function () {
		Session.set('chatBubble', '');
	},
	'click .chatBubble .enter-message a': function () {
		var text = $('.chatBubble .enter-message input').val();
		var targetPost = MS.Posts.Collections.Posts.findOne(Session.get('chatBubble').targetPostId);
		MS.Message.Functions.sendMessage(Meteor.user(), targetPost, text);
	}
});

