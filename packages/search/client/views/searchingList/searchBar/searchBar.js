Template.searchBar.onCreated(function () {
	//if(!Session.get('searchBarErrors'))
	Session.set('searchBarErrors', {near: false});
	//var searMS.Posts.Collections.Posts.findOne(Meteor.user().postId);
	Session.set('searchingSelector', {});
	//if(!Session.get('search'))
	//Session.set('search', {});
	

});

Template.searchOption.helpers({
	visiable: function(){
		return this.view;
	}
});
Template.searchBar.helpers({ 
	errorMessage: function(field) {
		return Session.get('searchBarErrors')[field]; 
	},
	errorClass: function (field) {
		return !!Session.get('searchBarErrors')[field] ? 'has-error' : '';
	},
	itemText: function(){
		//return Session.get('search').near;
	},
	option: function(){
		if(Meteor.user() && MS.Posts.Collections.Posts){ if(MS.Posts.Collections.Posts.findOne(Meteor.user().postId))
			var searchConfig = MS.Posts.Collections.Posts.findOne(Meteor.user().postId).searchConfig;
		}

		if(!searchConfig){
			var searchConfig = MS.Posts.Collections.ClientPosts.findOne().searchConfig;
		}

		for (var i = searchConfig.length - 1; i >= 0; i--) {
			//searchConfig[i].isSearchConfig = true;
			searchConfig[i].index = i;
			searchConfig[i].type = 'searchConfig';
			_.extend(searchConfig[i], MS.Posts.Objects.searchConfigMeta[i]);
			//searchConfig[i].view = MS.Posts.Objects.searchConfigMeta[i].view;
		}
		return searchConfig;
	},
});

Template.searchBar.events({
	'submit form': function (e) {
		e.preventDefault();
		//MS.Posts.Collections.Posts.findOne({"myInfo.0.value":'female'})
		var searchingSelector = {};
		var searchConfig = getSearchConfig();		
		console.log(searchConfig);

		for (var i = searchConfig.length - 1; i >= 0; i--) {
			var value =	searchConfig[i].value;

			//setSearchingSelector_forMultiOption(searchingSelector, i, value);
			if(typeof value == 'object' && searchConfig[i].selections){
					for (var j = value.length - 1; j >= 0; j--) {
						if(hasValue(value[j])){
						var item = "myInfo."+i+".value";
						searchingSelector[item] = value[j];
						}
					};

				}
			//setSearchingSelector_forRange(searchingSelector, i, value);
			if(typeof value == 'object' && !searchConfig[i].selections && value[0] && value[1] && (value[0]!=-1||value[1]!=-1) ){
				console.log(value);
			var item = "myInfo."+i+".value";
			searchingSelector[item] = {}
			if(value[0]!=-1)
				searchingSelector[item].$gt = value[0];
			if(value[1]!=-1)
				searchingSelector[item].$lt = value[1];
			//searchingSelector[item] = { $gt: value[0], $lt: value[1] };
			//.collection.find( { field: { $gt: value1, $lt: value2 } } );
			}

			if(hasValue(value)){
				if(typeof value == 'string'){
				var item = "myInfo."+i+".value";
				searchingSelector[item] = value;
				//console.log(item + value);

				}else if(typeof value == 'unmber'){
					//console.log('is Num');
					//console.log(value);
				}
			}
		}
		//console.log(MS.Posts.Collections.Posts.find(searchingSelector).fetch());
		console.log(searchingSelector);
		Session.set('searchingSelector', searchingSelector);
/*
		var near = $(e.target).find('[name=near]').val();
		//console.log(near);
		if(isNumeric(near) || near == ''){
			//console.log(near);
			if(near == '') near=1000000000000000;
			Session.set('searchBarErrors', {near: null});
			Session.set('search', {near: near});
			
		}else{
			Session.set('searchBarErrors', {near:'please in put a number'});
		}*/
		function getSearchConfig(){
	if(Meteor.user())		
		var searchConfig = MS.Posts.Collections.Posts.findOne(Meteor.user().postId).searchConfig;
	else
		var searchConfig = MS.Posts.Collections.ClientPosts.findOne().searchConfig;	
	return searchConfig;
}

function hasValue(val){ return (val != '' && val != '--' && val != ['','']);}

function setSearchingSelector_forMultiOption(searchingSelector, i, value){
	
}

function setSearchingSelector_forRange(searchingSelector, i, value){
	
}
	}
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}



var searchingClass = {
	selector: {},
	forRange: function(){
		selector = 5;
	}
};