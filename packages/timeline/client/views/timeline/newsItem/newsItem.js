function isOverflow(div){
  return div[0].offsetHeight < div[0].scrollHeight;
} 

Template.news.onCreated(function(){
	this.showMore = new ReactiveVar(false);
	this.showBigImg = new ReactiveVar(false);
});
Template.news.onRendered(function(){
	var _this = this;
	this.$('.options').hide();
	this.showMore.set(isOverflow(this.$('.showMore')));
	$(window).resize(function() {	
		if(_this.find('.showMore'))
		_this.showMore.set(isOverflow(_this.$('.showMore')));
	});
});

Template.news.helpers({

	HeadFilepickerId: function(){
		var Posts = MS.Posts.Collections.Posts;
		return Posts.findOne(this.postId).filepickerId;
	},
	NewsFilepickerId: function(){
		return this.filepickerId;
	},
	author: function(){
		var Posts = MS.Posts.Collections.Posts;
		return Posts.findOne(this.postId).author;
	},
	toProfile: function(){
		return Router.path('postPageInfo', {_id: this.postId, info: "Summary"});
	},
	opt: function(){
		//Send data context to each option from Ans
		if (this.option){
			var opt = []; 
			var checked = false;
			var rating;
			//find Ans and arrange it
			
			var AnsArr = [];
			AnsArr = MS.Timeline.Collections.Ans.find({issueId: this._id, userId: {$ne: Meteor.userId()}}).fetch();
			var CurrentUserAns = MS.Timeline.Collections.Ans.findOne({issueId: this._id, userId: Meteor.userId()});
			AnsArr.unshift(CurrentUserAns);
				
			//Generate opt array
			for (var i = this.option.length - 1; i >= 0; i--) {
				
				var postIdArr = [];

				if(AnsArr[0])
					for (var j = AnsArr.length - 1; j >= 0; j--) {
						//console.log(userAns);
						checked = false;
						rating = undefined;
						if(AnsArr[j].userAns)
						if(AnsArr[j].userAns[i]){
							postIdArr.push(AnsArr[j].postId);
							checked = (AnsArr[j].userId == Meteor.userId()) ? "checked" : false;
						}

						if(AnsArr[j].matchAns)
						if(AnsArr[j].matchAns[i]){
							rating = AnsArr[j].matchAns[i];
						}
					
						//console.log(postIdArr);
					};
				opt.push({index: i, text: this.option[i], postIdArr: postIdArr, isChecked: checked, rating: rating, creatingIssue: false});
				//console.log(opt[i]);
			};
			return opt;
		}
	},
	showBigImg: function() {
		return Template.instance().showBigImg.get();
		}
});

Template.news.events({
	"click .showing": function(event, template) {
		if(template.$('.showMore')){
			template.$('.showMore').attr('class','');//disable showMore css
			template.$('.showing').html('');
			template.$('.options').show();
		}
	},
	"click .newsImg, click .darkFilter": function(event, template) {
		console.log($(event.target).attr('class'));
		if( 'newsImg'==$(event.target).attr('class') ||
			'darkFilter'==$(event.target).attr('class') ||
			'fix-container'==$(event.target).attr('class') ||
			'cancelX'==$(event.target).attr('class')
			)
		template.showBigImg.set(!template.showBigImg.get());
	}
});
