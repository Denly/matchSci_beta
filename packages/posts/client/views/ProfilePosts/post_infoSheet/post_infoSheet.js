Template.infoSheet.helpers({
	LookingForItem: function(){
		var lookingFor = this.lookingFor;
		for (var i = lookingFor.length - 1; i >= 0; i--) {
			lookingFor[i].isLookingFor = true;
			lookingFor[i].index = i;
			lookingFor[i].type = 'lookingFor';
			_.extend(lookingFor[i], MS.Posts.Objects.lookingforMeta[i]);
		}
		return lookingFor;
	},
	AboutMeItem: function(){
		var myInfo = this.myInfo;
		for (var i = myInfo.length - 1; i >= 0; i--) {
			myInfo[i].isMyInfo = true;
			myInfo[i].index = i;
			myInfo[i].type = 'myInfo';
			_.extend(myInfo[i], MS.Posts.Objects.myInfoMeta[i]);
		}
		return myInfo;
	},
	ownPost: function(){
		return this.userId === Meteor.userId();
	}
});

Template.infoSheet.events({
	'click .infoTableEdit1': function(){
		var r = Session.get('editing');
		r.lookingFor = !(r.lookingFor);
		Session.set('editing', r);
		//console.log(r);
		
		
	},
	'click .infoTableEdit2': function(){
		var r = Session.get('editing');
		r.myInfo = !r.myInfo;
		Session.set('editing', r);
		//Session.set('editingTable2', !Session.get('editingTable2'));
		
	}	
});


