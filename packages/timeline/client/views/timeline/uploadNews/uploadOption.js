Template.uploadOption.events({
	'click .deleOpt': function(e){ 
		var arr = Session.get('isIssueOption');
		arr.splice(this.index,1);
		Session.set('isIssueOption', arr);
  }
});
