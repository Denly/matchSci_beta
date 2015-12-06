Template.subscriptionModal.events({
  "click #connect-userdata": function(event, template) {
    event.preventDefault();
    var instance = Template.instance(),
      cardNumber = parseInt(instance.$('#card-number').val()),
      expMonth = parseInt(instance.$('#exp-month').val()),
      expYear = parseInt(instance.$('#exp-year').val()),
      cvc = parseInt(instance.$('#cvc').val()),
      userEmail = Meteor.user().emails[0].address;
    if (_.isNaN(cardNumber) || _.isNaN(expMonth) || _.isNaN(expYear) || _.isNaN(cvc)) {
      toastr.warning("Plese Fill all fields");
    } else {
      Stripe.token.create({
        card: {
          "number": cardNumber,
          "exp_month": expMonth,
          "exp_year": expYear,
          "cvc": cvc
        }
      }, function(response, token) {
        if (token.error) {
          toastr.error(token.error.message);
        } else {
          Meteor.call('MS.Subscriptions.Methods.createCustomer', userEmail, token.id, function(error, result) {
            if (error) {
              toastr.error(error.reason);
            } else {
              console.log(result);
              Meteor.call('MS.Subscriptions.Methods.insertUserNonCriticalData',result.id,userEmail,function(error,result){
                if(error){
                  toastr.error(error.reason);
                }else{
                  MS.Subscriptions.Utils.CheckStripeData(instance);
                  toastr.success(result.message);
                }
              })
            }
          });
        }
      });
    }
    return false;
  },
  'click #cancel-customer-subscription': function() {
    console.log("click");
    var instance = Template.instance();
    Meteor.call('MS.Subscriptions.Methods.cancelSubscription', function(error, result) {
      if (error) {
        console.log(error);
        if (_.isEqual(error.error, 'susbcription-error')) {
          toastr.error(error.reason);
        }
      } else {
        MS.Subscriptions.Utils.CheckStripeData(instance);
        MS.Subscriptions.Utils.IsUserAMember(instance);
        toastr.success(result.message);
      }
    })
  },
  'click #subscribe-user': function(event, template) {
    var instance = Template.instance(),
      customerId = instance.subscriptionModalVars.get('customerId');
    Meteor.call('MS.Subscriptions.Methods.subscribeUser', customerId,
      function(error, result) {
        if (error) {
          toastr.error(error.reason);
        } else {
          MS.Subscriptions.Utils.IsUserAMember(instance);
          MS.Subscriptions.Utils.CheckStripeData(instance);
          toastr.success("Subscribed To plan Matschi Succed");
        }
      });
  }
});

Template.subscriptionModal.helpers({
  isUserRegisted: function() {
    var instance = Template.instance();
    return instance.subscriptionModalVars.equals('isUserRegisted', true);
  },
  isUserAlreadyASubscriptionMember:function(){
    var instance = Template.instance();
    return instance.subscriptionModalVars.equals('isUserAMemberAlready', true);
  }
});

Template.subscriptionModal.onRendered(function() {
  var _this = this;

  $('#subscription-modal').modal();

  _this.autorun(function() {
    MS.Subscriptions.Utils.CheckStripeData(_this);
    MS.Subscriptions.Utils.IsUserAMember(_this);
  });
});

Template.subscriptionModal.onCreated(function() {
  var _this = this;

  _this.subscriptionModalVars = new ReactiveDict();

  _this.subscriptionModalVars.setDefault('isUserRegisted', false);
  _this.subscriptionModalVars.setDefault('customerId', null);
  _this.subscriptionModalVars.setDefault('isUserAMemberAlready', null);
});
