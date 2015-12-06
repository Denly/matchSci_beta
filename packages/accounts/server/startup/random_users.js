Meteor.startup(function () {
	MS.Accounts.Functions.randomLikes();
	if(Meteor.users.find().count()<10) {
		console.log("random user ! x 10");
		MS.Accounts.Functions.buildRandomUser(10);
		
	}
	
});

MS.Accounts.Functions.buildRandomUser = function(num){
	for (var i = 0; i < num; i++) {
		var user = {
			username: _.uniqueId('test'),
			password: '111111',
			position: 'default',
			email: _.uniqueId()+'gmail.com',
			profile: {
        position: 'default',
        filepickerId: "skywtYkRhuNbJLJe3cAz"
      }
		}
		var myInfo = MS.Posts.Objects.defaultMyInfo;
		var post = {

		}
		MS.Accounts.Functions.buildNewUser(user);
	};
	
};
//randomLikes 20 times per user
MS.Accounts.Functions.randomLikes = function(){
	var AllUser = Meteor.users.find({}).fetch();
	var userNum = AllUser.length;
	var i;
	_.each(AllUser, function(user){		
		for (var i = 20; i >= 0; i--) {
			i = Math.floor((Math.random() * userNum));
			MS.Friend.Methods.like(user,AllUser[i]);	
			//console.log(user.username + ' like '+ AllUser[i].username);
		};
	});
}

