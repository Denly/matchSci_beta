/*Accounts.onLogin(function(){
	if(!Meteor.user().postId){
		//is a new user who don't have post yet
		Meteor.call('newUser', Meteor.userId(), function (error, result) {
			if(result){
				Router.go('postPage', {_id: result});
			}
		});
	} 
}); */
//onLogout
/*
Meteor.autorun(function () {
  if (!Meteor.userId()) {
   Router.go('/');
   console.log("onLogout");
  } 
});*/


MS.Accounts.Functions.grapImgUrlToFilepickerId = function(url, filename){
  if(filename){
    filename = _.last(url.split('/'));//substr(url.length - 4);
  }
  var filepickerId;
  filepicker.storeUrl(
  url,
  {filename: filename},
  function(Blob){
  	filepickerId = _.last(Blob.url.split("/"));
    console.log(JSON.stringify(Blob));
    console.log(MS.Posts.Collections.Posts.update(Meteor.user().postId, {$set:{filepickerId: filepickerId}}));
  }
);
  return filepickerId;
}

