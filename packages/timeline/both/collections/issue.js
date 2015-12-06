/*
The issues (questions) to tests user  
*/

MS.Timeline.Collections.Timeline = new Mongo.Collection('timeline');

MS.Timeline.Collections.Timeline.allow({
	insert: function(userId, doc){
		return ownsDocument(userId, doc);
	},
	update: function(userId, doc){
		return ownsDocument(userId, doc);
	},
	remove: function(userId, doc){
		return ownsDocument(userId, doc);
	}
});

//fixture
/*
if(Meteor.isServer){
var obj ={
text: 'yo',
option: ['11','22'],
userId: '9TXkSRrqQNY2dujRA',
postId: 'fuWaG54DcvJtryWwu',
submitted: new Date(),
type: 'MCQ'//Multiple choice questions, select one opt only
}

}*/