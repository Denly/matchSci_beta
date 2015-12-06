Template.chatBubble.onCreated(function(){
	//Session.set('chatBubble', {targetName: 'Jack_Sparrow', targetuserId: "pktKM6GjkuNMmgABG", targetPostId:'K6F5sKPHijToWiWYm', open: true});
	var instance = this;

	// initialize the reactive variables
	instance.Message = function() { 
		var chatBubble = Session.get('chatBubble');
		return MS.Message.Collections.Message.find(
			{$or:[{$and:[{from:Meteor.userId()},{to:chatBubble.targetUserId}]}, {$and:[{to:Meteor.userId()},{from:chatBubble.targetUserId}]} ]},
			{sort:{submitted: 1}}
			);
	};
	instance.loaded = new ReactiveVar(0);
	instance.limit = new ReactiveVar(1);
	instance.hasMorePosts = new ReactiveVar(true);
	instance.scrollButtom = new ReactiveVar(0);

	instance.autorun(function () {
		var chatBubble = Session.get('chatBubble');
		if(chatBubble){
			var opt = {
				userId: chatBubble.targetUserId,
				limit: instance.limit.get()
			};
			var subscription = instance.subscribe('Message', opt);
			var subscription = instance.subscribe('singlePost', Session.get('chatBubble').targetPostId);
			var limit = instance.limit.get();
			var messagediv = $('.textArea');
			console.log("Asking for "+limit+" issue…");
			instance.hasMorePosts.set( instance.Message().count() >= instance.limit.get() );

			if (subscription.ready()) {
				console.log("> Received "+instance.Message().count()+" Msg in bubble. \n\n");
				instance.loaded.set(limit);
				

				console.log('instance.hasMorePosts.get()');console.log(instance.hasMorePosts.get());
				console.log('isOverflow(messagediv');console.log(isOverflow(messagediv));
				if(instance.hasMorePosts.get() && !isOverflow(messagediv)){
    				//add limit if your element doesn't have overflow and has more posts
    				console.log('initialize');
    				var limit = instance.limit.get();
    				//increase limit by 5 and update it
    				limit += 5;
    				instance.limit.set(limit);
        			//scroll to buttom at beginning
        			messagediv.scrollTop(messagediv[0].scrollHeight);
        		}else if(instance.hasMorePosts.get() && isOverflow(messagediv)){
        			//after scrolled to top and got more msg, scorll down to origin position
        			console.log('scrollButtom fix');
        			messagediv.scrollTop(messagediv[0].scrollHeight-instance.scrollButtom.get());
        		} 
        	} else {
        		console.log("> Subscription is not ready yet. \n\n");
        	}



    }//end of no bubble

    


});

isOverflow = function(div){
  return div[0].offsetHeight < div[0].scrollHeight;
}

});


Template.chatBubble.onRendered(function() {

	var instance = this;
	instance.autorun(function () {
	if(Session.get('chatBubble')){
	Meteor.setTimeout(function(){
		var messagediv = instance.$('.textArea');
   		messagediv.scroll(function() {
  		console.log('is scrolling');
  	if (messagediv.scrollTop() == 0 && instance.hasMorePosts.get()) {
    // get current value for limit, i.e. how many posts are currently displayed
    	var limit = instance.limit.get();
    	// increase limit by 3 and update it
    	limit += 5;
    	console.log('limit += 5');
    	instance.limit.set(limit);
    	//where scrollButtom should go after get more msg
    	var scrollButtom = messagediv[0].scrollHeight - messagediv.scrollTop();
    	instance.scrollButtom.set(scrollButtom);
    	console.log('scrollButtom '+scrollButtom);
    
  }
});},500); 
}
});
  
});
