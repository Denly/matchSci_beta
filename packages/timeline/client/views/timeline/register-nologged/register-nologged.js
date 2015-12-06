Template.registerNonLogged.onCreated(function(){
//inactive container in reg proccess to reach whole screen while
$('.container').attr('class', 'inactive_container');
Session.get("questionStep", false);
});

Template.registerNonLogged.onDestroyed(function(){
$('.inactive_container').attr('class', 'container');
});

Template.registerNonLogged.events({
  'change #first-info , change #second-info': function(event, target) {
    var instance = Template.instance(),
      target = $(event.target),
      first,
      second,
      query = MS.Accounts.Collections.RegisterSteps.findOne(),
      targetId = target.attr('id'),
      targetValue = target.val();
    if (_.isEqual(targetId, 'first-info')) {
      instance.registerNonLoggedVars.set('selectFirst', targetValue);
    } else if (_.isEqual(targetId, 'second-info')) {
      instance.registerNonLoggedVars.set('selectSecond', targetValue);
    }
    if (instance.registerNonLoggedVars.get('selectFirst') && instance.registerNonLoggedVars.get('selectSecond')) {
      instance.registerNonLoggedVars.set('canSwitch', true);
      if (query) {
        MS.Accounts.Collections.RegisterSteps.update({
          $set: {
            first: instance.registerNonLoggedVars.get('selectFirst'),
            second: instance.registerNonLoggedVars.get('selectSecond')
          }
        });
      } else {
        MS.Accounts.Collections.RegisterSteps.insert({
          first: instance.registerNonLoggedVars.get('selectFirst'),
          second: instance.registerNonLoggedVars.get('selectSecond')
        });
      }
    }
  }
})

Template.registerNonLogged.helpers({
  currentStep: function() {
    return Session.get('regStep');//Template.instance().registerNonLoggedVars.get('currentStep');
  }
});

Template.registerNonLogged.onCreated(function() {
  if(!Session.get('regStep'))
    Session.set('regStep', 'step1');
});
