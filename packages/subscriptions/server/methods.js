var Customer = StripeSync('sk_test_EVmJpusbKJB2yMS3ymyNGWbv'),
  Future = Npm.require('fibers/future');

Meteor.methods({
  'MS.Subscriptions.Methods.createCustomer': function(userEmail, tokenId) {
    check([userEmail, tokenId], [String]);
    var stripeCustomerFuture = new Future(),
      query = MS.Subscriptions.Collections.Subscriptions.findOne({
        ownerId: this.userId
      });
    if (!_.isUndefined(query)) {
      console.log("---- We Need to update the current customer ----");
      console.log(query.id);
      Customer.customers.createSource(
        query.id, {
          source: tokenId
        },
        function(error, card) {
          if (card.error) {
            return stripeCustomerFuture.return(card.error.message);
          } else {
            return stripeCustomerFuture.return(card);
          }

        });
    } else {
      console.log("---- Creating New customer -----");
      Customer.customers.create({
        email: userEmail,
        card: tokenId,
        description: userEmail,
        metadata: {
          userId: this.userId,
          createWithCard: true
        },
      }, function(stauts, response) {
        if (response.error) {
          return stripeCustomerFuture.return(response.error.message);
        } else {
          return stripeCustomerFuture.return(response);
        }
      });
    }
    return stripeCustomerFuture.wait();
  },
  'MS.Subscriptions.Methods.subscribeUser': function(customerId) {
    check([customerId], [String]);
    var query = MS.Subscriptions.Collections.Subscriptions.findOne({
      ownerId: this.userId
    });
    console.log(query._id);
    Customer.customers.createSubscription(
      customerId, {
        plan: 123456789
      },
      function(error, subscription) {
        if (error) {
          //throw some error
        } else {
          MS.Subscriptions.Collections.Subscriptions.update(query._id, {
            $set: {
              subscriptionId: subscription.id,
              isSubscribed:true
            }
          })
          console.log(subscription);
        }
      }
    );
  },
  'MS.Subscriptions.Methods.insertUserNonCriticalData': function(id, email) {
    check([id, email], [String]);
    var customerData = {
      id: id,
      email: email,
      ownerId: this.userId,
      isSubscribed:false
    };
    MS.Subscriptions.Collections.Subscriptions.insert(customerData, function(error, result) {
      if (error) {
        throw new Meteor.Error("customer-error", "Something Goes Wrong When Lifecadence Try to integrate your Account");
      }
    });
    return resultObject = {
      stauts: 200,
      message: "Congratulations your credit data is now registed"
    };
  },
  'MS.Subscriptions.Methods.checkUserCredit': function(id, email, ownerId) {
    return MS.Subscriptions.Collections.Subscriptions.findOne({}, {
      owenerId: this.userId
    });
  },
  'MS.Subscriptions.Methods.isUserASubscriptedMember': function() {
    return MS.Subscriptions.Collections.Subscriptions.findOne({
      ownerId: this.userId
    });
  },
  'MS.Subscriptions.Methods.cancelSubscription': function () {
    var query = MS.Subscriptions.Collections.Subscriptions.findOne({
      ownerId: this.userId
    });
    console.log(query);
    Customer.customers.cancelSubscription(
      query.id,
      query.subscriptionId,
      function (err, confirmation) {
        if (confirmation.error) {
          throw new Meteor.Error("susbcription-error", "Cancel Subscription Error");
        } else {
          MS.Subscriptions.Collections.Subscriptions.update(query._id, {
            $set: {
              subscriptionId: '',
              isSubscribed:false
            }
          });
          return stripeCustomerFuture.return(confirmation);
        }
      }
    );
    return {
      stauts:200,
      message:"Subscription Canceled"
    }
  },
});
