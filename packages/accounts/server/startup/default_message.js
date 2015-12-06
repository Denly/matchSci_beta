
Meteor.startup(function () {
	if(MS.Message.Collections.Message.find().count() <= 10){
		randomMessage2();
	}
	
});

function randomMessage(){
	
		console.log('Generate default message');
		var usersArr = Meteor.users.find().fetch();
		var postsArr = MS.Posts.Collections.Posts.find().fetch();

		for (var i = usersArr.length - 1; i >= 0; i--) {
			for (var k = postsArr.length - 1; k >= 0; k--) {
				for (var x = 15 - 1; x >= 0; x--) {
					MS.Message.Functions.sendMessage(usersArr[i], postsArr[k], 'hi, I see '+ x + ' sheeps.');
				};		
			};
		};
}

function randomMessage2(){
	
		console.log('Generate default message');
		var usersArr = Meteor.users.find().fetch();
		var postsArr = MS.Posts.Collections.Posts.find().fetch();

		for (var i = usersArr.length - 1; i >= 0; i--) {
			for (var k = postsArr.length - 1; k >= 0; k--) {
				if(Math.random()<0.5)
				for (var x = 15 - 1; x >= 0; x--) {
					MS.Message.Functions.sendMessage(usersArr[i], postsArr[k], 'hi, I see '+ x + ' sheeps.');
				};		
			};
		};
}