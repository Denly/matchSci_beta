Template.postItem.helpers({
	ownPost: function() {
    return this.userId === Meteor.userId();
  },
  stars: function () {
    var stars = 0;
    if(Meteor.user()){
    var TargetHasAns = MS.Timeline.Collections.Ans.findOne({postId: this._id});
    var UserAnsArr = MS.Timeline.Collections.Ans.find({postId: Meteor.user().postId}).fetch();

    if(TargetHasAns && UserAnsArr!=[]){
      issueIdArr = getUserIssueIdArr(UserAnsArr)
      
      var TargetAnsArr = MS.Timeline.Collections.Ans.find({postId: this._id, issueId: {$in: issueIdArr}}).fetch();

      for (var i = TargetAnsArr.length - 1; i >= 0; i--) {
        var AnsOfUser = _.findWhere(UserAnsArr,{issueId: TargetAnsArr[i].issueId});
        stars += countStars(AnsOfUser, TargetAnsArr[i]);
      }
    }
  }
    return stars;
  },
	HeadFilepickerId: function () {
    	if(this.filepickerId){
    	//{"url":"https://www.filepicker.io/api/file/skywtYkRhuNbJLJe3cAz","filename":"defautImg.jpg","mimetype":"image/jpeg","size":5148,"isWriteable":true}
      		return this.filepickerId;
  		}else{
  			return 'skywtYkRhuNbJLJe3cAz';
  		}
    },
		submmitedAt:function(string){
			 return moment(string).format('LLLL');
		}
});


function countStars(AnsOfUser, AnsOfTarget){
  var stars = 0;
  for (var k = AnsOfUser.matchAns.length - 1; k >= 0; k--) {
    if(AnsOfUser.matchAns[k] && AnsOfTarget.userAns[k])
    stars += AnsOfUser.matchAns[k] * AnsOfTarget.userAns[k];
  }
  return stars;
}
function getUserIssueIdArr(UserAnsArr){
  issueIdArr = [];
    for (var i = UserAnsArr.length - 1; i >= 0; i--) {
      issueIdArr.push(UserAnsArr[i].issueId);
    }
    return issueIdArr;
}