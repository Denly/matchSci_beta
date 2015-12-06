Template.numberEditor.helpers({
	isMultiInput: function () {
		if (typeof this.value == 'object') {
			return true;
		};
	},
	from: function(){
		return this.value[0];
	},
	to: function(){
		return this.value[1];
	}
});

Template.numberEditor.events({
	'keyup input': function(e){
		console.log('key up');
		//update Posts.myInfo.0.age something like that
		//console.log( $(e.target).val() );
		var isMultiInput = typeof this.value == 'object';
		if(isMultiInput){
		if($(e.target).attr('name') == 'from')
			var query = this.type + '.' + this.index + '.value.0';
		else if($(e.target).attr('name') == 'to')
			var query = this.type + '.' + this.index + '.value.1';
		}else{
		var query = this.type + '.' + this.index + '.value';
		}
		var setModifier = { $set: {} };

		setModifier.$set[query] = parseInt($(e.target).val());

		//console.log('query');console.log(query);
		if(Meteor.user()){
			MS.Posts.Collections.Posts.update(Meteor.user().postId , setModifier, function(e, r){
			//console.log(e);console.log(r);
			});
		}else{
			MS.Posts.Collections.ClientPosts.update({author: 'guest'} , setModifier, function(e, r){
			//console.log(e);console.log(r);
		});
		}
	}
});
