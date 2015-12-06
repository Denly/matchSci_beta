Template.sliderEditor.onCreated(function(){
	var _this = this;	
	_this.searchFilterVars = new ReactiveDict();
	_this.searchFilterVars.setDefault('sliderValue', _this.data.value);
function dataToValue(arr){
	var value = arr.slice();
	_.each(value, function(v,i){
		if(v == -1)
			value[i]= _this.data.range[i];
	});
	console.log('value  is  ');
	console.log(value);
	return value;
}
function valueToData(arr){
	var value = arr.slice();
	_.each(value, function(v,i){
		if(v == _this.data.range[i])
			value[i]= -1;
	});
	console.log('value  is  ');
	console.log(value);
	return value;
}
	Meteor.setTimeout(function() {
		var valueStr = JSON.stringify(dataToValue(_this.data.value));
		$('#slider'+_this.data.index).attr('data-slider-value', valueStr)
		$('#slider'+_this.data.index).slider({});
		$('#slider'+_this.data.index).on("slide", function(slideEvt) {
			//console.log(slideEvt);
			//console.log(slideEvt.value);
			//var valueSlide = $("#slider").text(slideEvt.value);
			//console.log(valueSlide.val());
			_this.searchFilterVars.set('sliderValue', slideEvt.value);
			var modifier = { $set: {} };
			var query = _this.data.type + '.' + _this.data.index + '.value';

			var value = valueToData(slideEvt.value);
			/*if(value[0] <= _this.data.range[0])
				value[0] = -1;
			if(value[1] <= _this.data.range[1])
				value[1] = -1;*/
			modifier.$set[query] = value;
			//console.log(modifier);

			MS.Posts.Collections.Posts.update(Meteor.user().postId , modifier, function(e, r){
			//console.log('rrr= '+r);
			});
		});
	},0);

});

Template.sliderEditor.events({
	'click .span2': function (event, target) {
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

Template.sliderEditor.helpers({
	sliderValue: function() {
		var valueArr = Template.instance().searchFilterVars.get('sliderValue');
		//console.log('valueArr is '+valueArr);
		if(valueArr[0] <= this.range[0])
			valueArr[0] = '<'+valueArr[0];
		if(valueArr[1] >= this.range[1])
			valueArr[1] = '>'+valueArr[1];
		return valueArr[0] + " to " + valueArr[1];
	},
	sliderId:function() {
		return "slider"+this.index;
	},
	min: function(){
		return this.range[0];
	},
	max: function(){
		return this.range[1];
	}
});
/*
function getModifier(value){
	var isMultiInput = typeof this.value == 'Array';
		if(isMultiInput){
		if($(e.target).attr('name') == 'from')
			var query = this.type + '.' + this.index + '.value.0';
		else if($(e.target).attr('name') == 'to')
			var query = this.type + '.' + this.index + '.value.1';
		}else{
		var query = this.type + '.' + this.index + '.value';
		}
		var setModifier = { $set: {} };

		setModifier.$set[query] = parseInt($(e.target).val());
	return setModifier;
}
*/