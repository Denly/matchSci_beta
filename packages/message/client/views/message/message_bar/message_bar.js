
Template.messageBar.helpers({
	messageTalkLink: function(){
	if(this.to!=Meteor.userId()){
		var link = this.to;
	}else{
		var link = this.from;
	}
		return '/message/'+link;
	},
	from_re: function(){
		if(this.from == Meteor.userId()){
			return 'To:';
		}else{
			return 'From:';
		}
	},
	HeadFilepickerId: function(){
		var Posts = MS.Posts.Collections.Posts;
		if(this.from == Meteor.userId()){
		//console.log(Posts.findOne({userId: this.to}));
			return Posts.findOne({userId: this.to}).filepickerId;
		}else{
			return Posts.findOne({userId: this.from}).filepickerId;
		}
	},
	talkto: function(){
		if(this.from == Meteor.userId()){
			return this.toName;
		}else{
			return this.fromName;
		}
	},
	userName: function(){
		if(Meteor.user().username)
			return Meteor.user().username;
	}
});

Template.messageBar.onRendered(function() {
  Meteor.setTimeout(function() {
    $('.swipebox').swipebox();
  }, 0);
});
