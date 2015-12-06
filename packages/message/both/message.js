/*
Every Messages send by users
*/

MS.Message.Collections.Message = new Mongo.Collection('message');
//if(Meteor.isClient){
//ClientMessageList = new Mongo.Collection(null);
//}
MS.Message.Collections.Message.allow({
	insert: function(userId, doc){
		return doc.to === userId || doc.from === userId;
	},
	update: function(userId, doc){
		return doc.to === userId || doc.from === userId;
	},
	remove: function(userId, doc){
		return doc.to === userId || doc.from === userId;
	}
});

MS.Message.Functions.sendMessage = function (user, targetPost, text){
			//console.log('user');console.log(user);
			//console.log('targetPost');console.log(targetPost);
			var msg = {
			text: text,
			to: targetPost.userId,//pro data's Posts
			toPostId: targetPost._id,
			toName: targetPost.author,
			from: user._id,
			fromPostId: user.postId,
			fromName: user.username,
			submitted: new Date()
		}

		MS.Message.Collections.Message.insert(msg);
		var MessageList = MS.Message.Collections.MessageList;
		msg.read = false;
		//Update
		var repeat = MS.Message.Collections.MessageList.findOne( {$or:[ {$and:[{from: user._id},{to:msg.to}]} , {$and:[{to: user._id},{from:msg.to}]} ]});
		if(repeat){
			MessageList.update(repeat._id,{$set: msg});
			//console.log("repeat, so updated");
			return {_id: repeat};
		}else{
	//Insert
	//console.log("insert!");
	var msgId = MessageList.insert(msg);
	return {_id: msgId};
}
		
}



Meteor.methods({

	messageInsert: function(messageAttributes){
		check(messageAttributes, {
			text: String,
			to: String,
			toName: String
		});
		
		var errors = validateMessage(messageAttributes);
		if (errors.text)
			throw new Meteor.Error('invalid-message', "You must set a text for your message");
		
		//console.log("server this is "+JSON.stringify(this));
		//console.log("server this.userId is "+this.userId);
		//console.log("usersss"+JSON.stringify(Meteor.users.findOne(messageAttributes.to).username));
		var user = Meteor.user();
		
		var msg = _.extend(messageAttributes, {
			from: user._id,
			fromName: user.username,
			submitted: new Date()
		});
		var msgId = MS.Message.Collections.Message.insert(msg);
		//console.log('msgId is '+msgId);
		return {_id: msgId};

	}
});