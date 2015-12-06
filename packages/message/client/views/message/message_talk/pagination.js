Template.messageTalk.onCreated(function(){

	var instance = this;

  // initialize the reactive variables
  instance.Message = function() { 
    var obj = Template.currentData();
    return MS.Message.Collections.Message.find(
      {$or:[{$and:[{from:Meteor.userId()},{to:obj.userId}]}, {$and:[{to:Meteor.userId()},{from:obj.userId}]} ]},
      {sort:{submitted: 1}}
      );
  };
  instance.loaded = new ReactiveVar(0);
  var limit = instance.Message().count() ? instance.Message().count() : 5;
  instance.limit = new ReactiveVar(limit);
  instance.hasMorePosts = new ReactiveVar(true);
  instance.scrollButtom = new ReactiveVar(0);
  // 2. Autorun

  // will re-run when the "limit" reactive variables changes
  instance.autorun(function () {
  	var opt ={
  		userId: Template.currentData().userId,
  		limit: instance.limit.get()
  	};
    // get the limit
    var limit = instance.limit.get();
    //console.log("Asking for "+limit+" issue…");

    // subscribe to the posts publication
    var subscription = instance.subscribe('Message', opt);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
    	console.log("> Received "+instance.Message().count()+" timeline. \n\n");
    	instance.loaded.set(limit);
    	instance.hasMorePosts.set( instance.Message().count() >= instance.limit.get() );

    	var messagediv = $('.messagediv');
      //console.log('messagediv[0].scrollHeight');console.log(messagediv[0].scrollHeight);
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
        messagediv.scrollTop(messagediv[0].scrollHeight-instance.scrollButtom.get());
      }

    } else {
    	console.log("> Subscription is not ready yet. \n\n");
    }
  });

function isOverflow(div){
  return div[0].offsetHeight < div[0].scrollHeight;
} 

});


Template.messageTalk.onRendered(function() {
	var instance = this;
	var messagediv = $('.messagediv');
	console.log('is onRendered');
  // is triggered every time we scroll
  messagediv.scroll(function() {
  	console.log('is scrolling');
  	if (messagediv.scrollTop() == 0) {
    // get current value for limit, i.e. how many posts are currently displayed
    var limit = instance.limit.get();
    // increase limit by 5 and update it
    limit += 5;
    instance.limit.set(limit);
    var scrollButtom = messagediv[0].scrollHeight - messagediv.scrollTop();
    instance.scrollButtom.set(scrollButtom);
    //console.log('scrollButtom '+scrollButtom);
  }
});

});


Template.messageTalk.helpers({
	message: function () {
    return Template.instance().Message();
  },
  hasMorePosts: function () {
    return Template.instance().hasMorePosts.get();
  }
});


Template.messageTalk.events({
	'click .load-more': function (event, instance) {
		event.preventDefault();
		var limit = instance.limit.get();

    // increase limit by 5 and update it
    limit += 2;
    instance.limit.set(limit);
  }
});

//function get()
/*
MS.Message.Collections.Message.find({}, {sort:{submitted: 1}}).observeChanges({
  addedBefore: function (id, fields, before) {
  	//var MessageArr = MS.Message.Collections.Message.find({}, {sort:{submitted: 1}}).fetch();
    //console.log(fields.submitted >= MessageArr[(MessageArr.length-2)].submitted);
    console.log(before);
    console.dir(fields);console.dir(before);
    if(!before){
    	console.log('is new Msg');
    }
  }
});*/
/*var obj = Template.currentData();
    return MS.Message.Collections.Message.find(
    {$or:[{$and:[{from:Meteor.userId()},{to:obj.userId}]}, {$and:[{to:Meteor.userId()},{from:obj.userId}]} ]},
    {sort:{submitted: 1}}
    );*/
//return MS.Message.Collections.Message.find({}, {sort:{submitted: 1}});//, limit: instance.loaded.get()