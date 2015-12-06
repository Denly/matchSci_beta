/*
The collection of users' answers of Issues
*/

MS.Timeline.Collections.Ans = new Mongo.Collection('ans');

MS.Timeline.Collections.Ans.allow({
	insert: function(userId, doc){
		return ownsDocument(userId, doc);
	},
	update: function(userId, doc){
		return ownsDocument(userId, doc);
	},
	remove: function(userId, doc){
		return ownsDocument(userId, doc);
	}
});


MS.Timeline.Functions.AnsIssueUserAns = function(issueId, user, userAnsIndex, val){
	var Ans = MS.Timeline.Collections.Ans;
	var optLength = MS.Timeline.Collections.Timeline.findOne(issueId).option.length;
	var userAns = new Array(optLength);
	var matchAns = new Array(optLength);
	var hadAnswered = Ans.findOne({issueId: issueId, userId: user._id});
	if(hadAnswered){
			//console.log('hadAnswered');	
			userAns = hadAnswered.userAns ? hadAnswered.userAns : userAns;
			userAns[userAnsIndex] = val;
			Ans.update(hadAnswered._id, {$set: {userAns: userAns, submitted: new Date()}}, function(e,r){console.log(r);});
		}else{
			//console.log('new Answere');
			userAns[userAnsIndex] = val;
			var ans = {
				issueId: issueId,
				userId: user._id,
				postId: user.postId,
				userAns: userAns,
				matchAns: matchAns,
				submitted: new Date()
			};
			Ans.insert(ans, function(e,r){console.log(r);});
		}
	};

	MS.Timeline.Functions.AnsIssueMatchAns = function(issueId, user, matchAnsIndex, rateValue){
		var hadAnswered = MS.Timeline.Collections.Ans.findOne({
			issueId: issueId,
			userId: user._id
		});
		var optLength = MS.Timeline.Collections.Timeline.findOne(issueId).option.length;

		if(hadAnswered && hadAnswered.issueId){
			var matchAns = hadAnswered.matchAns;
			matchAns[matchAnsIndex] = rateValue;
			MS.Timeline.Collections.Ans.update(hadAnswered._id, {$set: {matchAns: matchAns, submitted: new Date()}}, function(e,r){console.log(r);});
		}else{
			var matchAns = new Array(optLength);
			matchAns[matchAnsIndex] = rateValue;
			userAns = new Array(optLength);

			var ans = {
				issueId: issueId,
				userId: user._id,
				postId: user.postId,
				userAns: userAns,
				matchAns: matchAns,
				submitted: new Date()
			};
			MS.Timeline.Collections.Ans.insert(ans, function(e,r){console.log(r);});
		}
	};
	
/*
{
	issueId:
	userId:
	postId:
	userAns:
	matchAns: 
	submitted:
	importance: 
}
*/

