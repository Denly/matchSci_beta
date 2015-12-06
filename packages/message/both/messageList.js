/*
Message list, wich just like a chating box, 
every converstion has only one Message list.
We use this collection in message dropdown and msg list.
text: is the newest message
*/
//
MS.Message.Collections.MessageList = new Mongo.Collection('messageList');
/*
			text: the real newest mesage,
			to: userId of reciver,
			toName: name of reciver,
			from: userId of sender,
			fromName: name of sender,
			submitted: Date,
			read: have read or not. read true == had read == '' no light
*/
MS.Message.Collections.MessageList.allow({
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

validateMessage = function (msg) {
  var errors = {};  
  if (!msg.text)
    errors.text =  "Please fill in a text";
  return errors;
}
