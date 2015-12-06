Template.messageSend.events({
	'submit form': function(e){
		e.preventDefault();		
		MS.Message.Functions.sendMessage(Meteor.user(), Template.currentData(), $(e.target).find('[name=text]').val());
	}
});

Template.messageSend.created = function(){
	Session.set('postSubmitErrors', {});
}


Template.messageSend.helpers({
	errorMessage: function(field) {
		return '';
    //Session.get('postSubmitErrors')[field];
},
errorClass: function (field) {

	return '';
    //!!Session.get('postSubmitErrors')[field] ? 'has-error' : '';//to change color//?????
}
});




//console.log("client this is "+JSON.stringify(this));
		//console.log("client this.userId is "+this.userId);
		//var errors = validateMessage(msg);
		//if (errors.text)
		//	return Session.set('postSubmitErrors', errors);//using return to leave the function, not because we want to actually return this value anywhere.


		/*
		Meteor.call('messageListInsert', msg, function (error, result) {
			//console.log("error is "+error);
			//console.log('result is '+result);
			if(error){
				return Errors.throw(error.reason); //using return to abort the callback
			}
		});
		
		Meteor.call('messageInsert', msg, function (error, result) {
			//console.log("error is "+error);
			//console.log('result is '+result);
			if(error){
				return Errors.throw(error.reason); //using return to abort the callback
			}
		});*/