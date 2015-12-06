Template.registerHelper("equal", function (a, b) {
	//console.log(a);console.log(b);
  return a == b;
});

Template.option.events({
	'click label': function (e) {
		if (Meteor.user()){
			MS.Timeline.Functions.AnsIssueMatchAns(
				Template.parentData()._id, 
				Meteor.user(), 
				this.index,
				$(e.target).attr('for')[25]//get the number of the star
				);
			//console.log("rate "+$(e.target).attr('for')[25]);	

		}else{
			Errors.throw("Please Log-in _(:з」∠)_");
		}
	},
	'click .userAns': function(e){
		//insert or update Ans
		if(Meteor.user()){
			MS.Timeline.Functions.AnsIssueUserAns(
				Template.parentData()._id, 
				Meteor.user(), 
				this.index,
				$(e.target).is(':checked')
				)
		}else{
			Errors.throw("Please Log-in _(:з」∠)_");
		}
	},
	'click .deleOpt': function(e){ 
		var arr = Session.get('isIssueOption');
		arr.splice(this.index,1);
		Session.set('isIssueOption', arr);
      //$(e.target).parent().parent().parent().remove();
  }
});

Template.option.helpers({
	heads: function(){
		var Posts = MS.Posts.Collections.Posts;
		if(this.postIdArr){
			var r = [];
			for (var i = this.postIdArr.length - 1; i >= 0; i--) {
				r.push(Posts.findOne(this.postIdArr[i]).filepickerId);
			}
		//console.log(r);
		return r;
	}
}
});


Template.starRating.helpers({
	CheckboxId: function(i){
		var id = Template.parentData() ? Template.parentData()._id : 'posting';
		var CheckboxId = "Rate_" + id+ "_"+ this.index+"_"+i;
		return CheckboxId;
	},
	ratingFor: function(i){
		var id = Template.parentData() ? Template.parentData()._id : 'posting';
		var rating = "Rateing_" + id;
		return rating;
	},
	words: function(i){
		var ans = MS.Timeline.Collections.Ans.findOne({
				issueId: Template.parentData() ? Template.parentData()._id : '',
				userId: Meteor.userId()
			});

		if(ans && ans.issueId){
		var thisMatchAns = ans.matchAns[this.index];
		//console.log(thisMatchAns);
		var words;
		if(thisMatchAns == 5)
			words = 'Must';
		else if(thisMatchAns == 4)
			words = 'Good';
		else if(thisMatchAns == 3)
			words = "no mind";
		else if(thisMatchAns == 2)
			words = "May not";
		else if(thisMatchAns == 1)
			words = "Don't";
		//console.log(words);
		return words;	
		}
		
	}
});



/* Older code of answering issue
			var hadAnswered = MS.Timeline.Collections.Ans.findOne({
				issueId: Template.parentData() ? Template.parentData()._id :'',
				userId: Meteor.userId()
			});

			if(hadAnswered && hadAnswered.issueId){
				var matchAns = hadAnswered.matchAns;
				matchAns[this.index] = rate;
				MS.Timeline.Collections.Ans.update(hadAnswered._id, {$set: {matchAns: matchAns, submitted: new Date()}}, function(e,r){console.log(r);});
			}else{
				var matchAns = new Array(Template.parentData().option.length);
				matchAns[this.index] = rate;
				userAns = new Array(Template.parentData().option.length);

				var ans = {
					issueId: Template.parentData()._id,
					userId: Meteor.userId(),
					postId: Meteor.user().postId,
					userAns: userAns,
					matchAns: matchAns,
					submitted: new Date()
				};
				MS.Timeline.Collections.Ans.insert(ans, function(e,r){console.log(r);});
			}*/

			/*
		var Ans = MS.Timeline.Collections.Ans;
		var userAns = new Array(Template.parentData().option.length);
		var matchAns = new Array(Template.parentData().option.length);
		var hadAnswered = Ans.findOne({issueId: Template.parentData()._id, userId: Meteor.userId()});
		if(hadAnswered){
			//console.log('hadAnswered');	
			userAns = hadAnswered.userAns ? hadAnswered.userAns : userAns;
			userAns[this.index] = $(e.target).is(':checked');
			Ans.update(hadAnswered._id, {$set: {userAns: userAns, submitted: new Date()}}, function(e,r){console.log(r);});
		}else{
			//console.log('new Answere');
			userAns[this.index] = $(e.target).is(':checked');
			var ans = {
				issueId: Template.parentData()._id,
				userId: Meteor.userId(),
				postId: Meteor.user().postId,
				userAns: userAns,
				matchAns: matchAns,
				submitted: new Date()
			};
			Ans.insert(ans, function(e,r){console.log(r);});
		}*/