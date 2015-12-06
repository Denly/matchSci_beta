Template.physical.onCreated(function(){
	var _this = this;
	//_this.$("#ex2").slider({});
	_this.searchFilterVars = new ReactiveDict();
	_this.searchFilterVars.setDefault('sliderValue', [20,40]);

	Meteor.setTimeout(function() {
		$("#ex2").slider({});
		$("#ex2").on("slide", function(slideEvt) {
			//console.log(slideEvt);
			console.log(slideEvt.value);
			//var valueSlide = $("#slider").text(slideEvt.value);
			//console.log(valueSlide.val());
			_this.searchFilterVars.set('sliderValue', slideEvt.value);
		});
	},0);

});

Template.physical.events({
	'click #ex2': function (event, target) {
		var instance = Template.instance(),
		eventTarget = $(event.target),
		targetValue = eventTarget.attr('id');
		instance.searchFilterVars.set('wichView', targetValue);

		/*
		Meteor.setTimeout(function() {
			$("#slider").on("slide", function(slideEvt) {
				console.log(slideEvt);
				var valueSlide = $("#slider").text(slideEvt.value);
				instance.searchFilterVars.set('sliderValue', valueSlide.val());
			});
		}, 0);
*/
}
});

Template.physical.helpers({
	sliderValue: function() {
		var valueArr = Template.instance().searchFilterVars.get('sliderValue');
		return valueArr[0] + " to " + valueArr[1];
	}
});
