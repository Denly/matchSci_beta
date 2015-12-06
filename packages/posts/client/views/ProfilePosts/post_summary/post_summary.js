Template.summary.events({
	'click .edit': function (e) {
		var editItem = 'edit_' + $(e.target).parent().attr('class');  
		Session.set(editItem, true);
	}
	
});

Template.summary.helpers({
	ownPost: function () {
		return this.userId === Meteor.userId();
	},
	edit_summary: function(){
		return Session.get('edit_summary');
	},
	edit_interesting: function(){
		return Session.get('edit_interesting');
	},
	edit_weekend: function(){
		return Session.get('edit_weekend');
	}
});
