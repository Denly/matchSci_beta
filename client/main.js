Meteor.startup(function(){
	loadFilePicker('AgbGlQUT7CqMh4xLTCZQZz');
	var key = 'pk_test_zE2qJO881l4Bo4pyASHmsrmX';
	Stripe.setPublishableKey(key);
  var handler = StripeCheckout.configure({
    key: key,
    token: function (token) {
      console.log(token);
    }
  });
});
