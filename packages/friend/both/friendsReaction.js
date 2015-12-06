/*
The collection of all reactions between users. ex. liking and viewing
*/

MS.Friend.Collections.Friend = new Mongo.Collection('friend');
Friend = MS.Friend.Collections.Friend;
/*
ex			
      _id: "jhz57FL5rM3fdtiWG"
      date: Sat Jun 27 2015 18:13:14 GMT-0400 (EDT)
      read: false
      senderPost: "spBPtkJJq6ArEQipk" 
      targetPost: "F4Z2xXLiKT4H45i7N"
      type: "like"
*/
MS.Friend.Collections.Friend.allow({
	insert: function(userId, doc){
		return !!userId;		
	},
	update: function(userId, doc){
		return !!userId;
	},
	remove: function(userId, doc){
		return !!userId;
	}
});

MS.Friend.Methods.like = function(user, target){
		//console.log('liking');
		var hadLiked = MS.Friend.Collections.Friend.findOne(
			{ 
				type:'like',
				senderPost: user.postId,
				targetPost: target.postId
			});

		if( user.postId && target.postId && !hadLiked){
			//console.log('_id '+ _id);
			MS.Friend.Collections.Friend.insert({ 
				type:'like',
				senderPost: user.postId,
				targetPost: target.postId,
				read: false,
				date: new Date()
			});
		}else{
			console.log("hadLiked, or lacked user's postId");
		}
}