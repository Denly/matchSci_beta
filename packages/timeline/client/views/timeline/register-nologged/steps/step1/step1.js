Template.step1.events({
  "click .matchBtn": function(e) {
    console.log($(e.target).attr('data'));
    Session.set('regStep', 'step2');
    Session.set('regData', $(e.target).attr('data'));
  },
  "click #login_with_facebook": function() {
    console.log("click");
    Meteor.loginWithFacebook({
      requestPermissions: ['email', 'user_birthday', 'user_about_me', 'user_posts']
    }, function(err) {
      if (err) {
        console.log(err);
        throw new Meteor.Error("Facebook login failed");

      } else {        
        //console.log(result);
        Meteor.setTimeout(function(){
          var filepickerId = MS.Accounts.Functions.grapImgUrlToFilepickerId(Meteor.user().services.facebook.picture);
        },1000);
      }
    });
  },
  "click #edit-first": function(event, template) {
    Template.instance().step1Vars.set('showEditAgain', true);
  }
});

Template.step1.helpers({
  alreadyInfo: function() {
    return MS.Accounts.Collections.RegisterSteps.find().count() >= 1;
  },
  showCurrentInfo: function() {
    return MS.Accounts.Collections.RegisterSteps.findOne();
  },
  showEditAgain: function() {
    return Template.instance().step1Vars.get('showEditAgain');
  }
});

Template.step1.onRendered(function() {
  _this = this;

  Meteor.setTimeout(function() {
    $('.selectpicker').selectpicker();
  }, 0);
})

Template.step1.onCreated(function() {
  _this = this;

  _this.step1Vars = new ReactiveDict();

  _this.step1Vars.setDefault('showEditAgain', false);
})
