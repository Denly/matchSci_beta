Template.postEdit.onCreated(function () {
	Session.set('postEditErrors', {});
});

Template.postEdit.helpers({ 
	errorMessage: function(field) {
		return Session.get('postEditErrors')[field]; },
	errorClass: function (field) {
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	},
	itemText: function(){
		return Template.parentData()[this.i];
	}
	});

Template.postEdit.events({ 
	'submit form': function(e) {
	e.preventDefault();
	var currentPostId = Template.parentData()._id;
	var editItem = this.i;  
	//console.log('editItem is '+editItem);
	//console.log($(e.target).parent());
	var postProperties = {};
	postProperties[editItem] = $(e.target).find('[name=title]').val();

	//return Session.set('postEditErrors', errors);
	var Posts = MS.Posts.Collections.Posts;
	Posts.update(currentPostId, {$set: postProperties}, function(error, r) { if (error) {
        // display the error to the user
        Errors.throw(error.reason); } else {
        	console.log('post update success '+r);
        	//Router.go('postPage', {_id: currentPostId});
        }
    }); },

	'click .cancel': function(e){
		var editItem = 'edit_' + this.i;
		console.log(editItem);
		Session.set(editItem, false);
	}
});