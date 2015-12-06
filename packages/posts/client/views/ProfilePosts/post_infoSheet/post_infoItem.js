Template.registerHelper('and', function(a, b){
	return a && b;
});
Template.registerHelper('objectFind', function(a, b){
	return a[b];
});

Template.infoItem.helpers({
	itemClass: function(){
		if(this.lookingFor)
			return 'editTable1_' + this.item;
		if(this.myInfo)
			return 'editTable2_' + this.item;
	},
	editing: function(){
		return Session.get('editing');
	},
	unit: function(){
		if(this.item == 'Height'){
			return 'cm';
		}
	}
});
