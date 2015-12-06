Template.bubbleItem.helpers({
	sideClass: function(){
		return (this.to == Meteor.userId()) ? "left-img" : "right-img";
	},
	HeadFilepickerId: function () {
    var filepickerId;
    if(this.from == Meteor.userId()){
      filepickerId = Meteor.user().profile.filepickerId;
      //console.log('filepickerId');console.log(filepickerId);
    }else{
      filepickerId = MS.Posts.Collections.Posts.findOne(this.fromPostId).filepickerId;

    }
    
     filepickerId =filepickerId ? filepickerId : 'skywtYkRhuNbJLJe3cAz';
     
     return filepickerId;
    /*
		var from = this.from;
    	var userId = Meteor.userId();
		if(from == userId){
			var filepickerId = Meteor.user().profile.filepickerId;
    	}else{    		
    		var filepickerId = MS.Posts.Collections.Posts.findOne(this.fromPostId).filepickerId;
    	}
    	if(filepickerId){
      		return filepickerId;
  		}else{
  			return 'skywtYkRhuNbJLJe3cAz';
  		}*/
    }
});
