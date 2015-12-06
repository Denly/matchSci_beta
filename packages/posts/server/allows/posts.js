MS.Posts.Collections.Posts._ensureIndex({'location':'2dsphere'});

MS.Posts.Collections.Posts.allow({
	update: function(userId, doc, fieldNames){
     //var beFriends = fieldNames == 'friends';
     //console.log(fieldNames);
     //console.log('beFriends ' + beFriends);
		return ownsDocument(userId, doc); 
	},
	remove: function(userId, doc){
		return ownsDocument(userId, doc);
	}
});
/*
*@This is the deny thing
*
*/
MS.Posts.Collections.Posts.deny({
	update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
	}
});
MS.Posts.Collections.Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.indexOf(fieldNames, 'userId', 'author', 'submitted', '_id') !== -1 );
    /*
    * Make sure post didn't lost (or add) new objects
    * fieldNames is an array of the (top-level) fields in doc that the client wants to modify, for example ['name', 'score'].
    * without() Method to return a sub-array containing the fields that are not url or title
    * may bypass the duplex check
    */

  }
});

//double check in deny() and client's submit function
var validatePost = function (post) {
  var errors = {};
  //if (!post.title)
   // errors.title = "Please fill in a headline";
  //if (!post.url)
    //errors.url =  "Please fill in a URL";
  return errors;
}