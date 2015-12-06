Template.searchingIssue.helpers({
  issueArr: function () {
    if(Session.get('searchingIssue'))
    return MS.Timeline.Collections.Timeline.find({type: 'issue'});
  }
});