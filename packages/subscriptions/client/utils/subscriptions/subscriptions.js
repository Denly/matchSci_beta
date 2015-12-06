MS.Subscriptions.Utils.CheckStripeData = function(instance){
  Meteor.call('MS.Subscriptions.Methods.checkUserCredit', function(error, result) {
    if (error) {
      toastr.error("We have some problems taking your data please try later");
    } else {
      console.log(result);
      if (!_.isUndefined(result)) {
        if (result.id) {
          console.log("lleog gasta aca");
          instance.subscriptionModalVars.set('isUserRegisted', true);
          instance.subscriptionModalVars.set('customerId', result.id)
        }
      }
    }
  });
};


MS.Subscriptions.Utils.IsUserAMember = function(instance){
  Meteor.call('MS.Subscriptions.Methods.isUserASubscriptedMember',function(error,result){
    if(error){
      toastr.error(error.reason);
    }else{
      if (result && !_.isUndefined(result.subscriptionId) && _.isEqual(result.isSubscribed,true)) {
          instance.subscriptionModalVars.set('isUserAMemberAlready', true);
      }
    }
  });
}
