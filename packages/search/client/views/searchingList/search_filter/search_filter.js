Template.searchStatus.onCreated(function() {
  Session.set('openFilter', false);
  Session.set('searchingSelector',{});
});

Template.searchStatus.events({
  'click .searchStatus': function(instance) {
    var openFilter = !Session.get('openFilter');    
      Session.set('openFilter', openFilter);
  }
});

Template.searchStatus.helpers({
  openFilter: function() {
    return Session.get('openFilter');
  }
});

Template.searchFilter.events({
  'click .cancelX': function() {
    Session.set('openFilter', false);
    console.log(Session.get('openFilter'));
  },
  'click .filterView': function(event, target) {
    var instance = Template.instance(),
      eventTarget = $(event.target),
      targetValue = eventTarget.attr('id');
    instance.searchFilterVars.set('wichView', targetValue);
    console.log($('.'+targetValue));
    $('.row.searchOption').hide();
    $('.row.searchOption.'+targetValue).show();
    //$('.'+targetValue).hide();
    /*Meteor.setTimeout(function() {
      var mySlider = $("#slider").slider();
      $("#slider").on("slide", function(slideEvt) {
        console.log(slideEvt);
        var valueSlide = $("#slider").text(slideEvt.value);
        instance.searchFilterVars.set('sliderValue', valueSlide.val());
      });
    }, 0);*/
  }
});

Template.searchFilter.helpers({
  wichViewShow: function(viewName) {
    var currentViewSelected = Template.instance().searchFilterVars.get('wichView');
    return _.isEqual(currentViewSelected, viewName);
  },
  sliderValue: function() {
    return Template.instance().searchFilterVars.get('sliderValue');
  },
	thereIsSomethingToShow:function(){
		return !Template.instance().searchFilterVars.equals('wichView', null);
	}
});

Template.searchFilter.onCreated(function() {
  var _this = this;
  _this.searchFilterVars = new ReactiveDict();
  _this.searchFilterVars.setDefault('wichView', 'physical');
  Meteor.setTimeout(function(){
    $('.inner.row.searchOption').hide();
  },0)
  //_this.searchFilterVars.setDefault('sliderValue', 5);
});
