Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    if (Meteor.user()) {
      var subscribeFinished = [
        Meteor.subscribe('userData'),//basic user() data
        Meteor.subscribe('UserPost'),//for user to get his head img and searchingConfig
        Meteor.subscribe('UserLikeNotification'),//for LikeNotification dropdown
        Meteor.subscribe('MessageList'),//for MessageList dropdown
        Meteor.subscribe('Ans') //for testing. get all ans of quize in timeline item, 
      ];
      return subscribeFinished;
    } else {
      var subscribeFinished = [
        Meteor.subscribe('Ans'),//for testing. get all ans of quize in timeline item, 
      ];

      return subscribeFinished;
    }

  }
});
