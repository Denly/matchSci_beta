
Template.dropdownEditor.helpers({
	list: function(){
		//selections is the all possible selections string in the dropdown
		//option is what we want to send to list
		var selections = this.selections;
		var value = this.value;
		var options = [];

		function isLight(i){
			if(typeof value == 'object'){
				return (value.indexOf(selections[i]) != -1) ? 'light' : '';//light means it's selected
			}else{
				return (selections[i] == value) ? 'light' : '';//light means it's selected
			}
		}
		
		for (var i = selections.length - 1; i >= 0; i--) {
			options.push({
				option: selections[i],
				item: this.item,
				type: this.type,
				index: this.index,
				optIndex: i,
				value: this.value,
				light: isLight(i)
			});
		}	
	
		return options;
	}
});

Template.dropdownEditor.events({
	'click .dropdownOption': function(e){
		//update Posts.myInfo.0.age something like that 
		var query = this.type + '.' + this.index + '.value';
		var value = this.option;

		if( typeof this.value == 'object'){
			value = this.value;
			var valueIdex = this.value.indexOf(this.option);
			
			if(valueIdex == -1){
				value.push(this.option);
			}else{
				value.splice(valueIdex, 1);
			}

		}

		var setModifier = { $set: {} };
		setModifier.$set[query] = value;

		//console.log(setModifier);console.log(Template.currentData()._id);
		if (Meteor.user()){
			MS.Posts.Collections.Posts.update(Meteor.user().postId, setModifier, function(e, r){
			console.log(e);console.log(r);
		});
		}
		else{ 
			var	postId = MS.Posts.Collections.ClientPosts.findOne()._id;
			MS.Posts.Collections.ClientPosts.update(postId, setModifier, function(e, r){
			console.log(e);console.log(r);
		});
		}
		 
		

	}
});