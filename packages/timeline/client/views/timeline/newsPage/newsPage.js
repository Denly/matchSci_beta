Template.newsPage.helpers({
  isRegisterStep: function(){
    return ( !Meteor.user() || Session.get("questionStep") );
  }
});