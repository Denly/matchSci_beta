Template.postPage.onCreated(function(){
	//Session.set('PostPageNevTo', 'Summary');
    Session.set('editing', {});
    Session.set('editingTable1', false);
    Session.set('editingTable2', false);
});

Template.registerHelper("switchTemplate", function (temp) {
  return Router.current().params.info == temp;
});

Template.postPage.events({
	'click .navP': function (e) {
		 var to = $(e.target).attr('id');
		 $('.active').attr('class','');
		 $(e.target).parent().attr('class','active');
		 //console.log($(e.target).attr('id'));
         Router.go('postPageInfo', {_id: this._id, info: to});
		 //Session.set('PostPageNevTo', to);
	}
});




/*
function ReverseGeocode(latitude, longitude){
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {
 
            if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                    navigator.notification.alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                    }
            else {
                    navigator.notification.alert('Unable to detect your address.');
                    }
        } else {
            navigator.notification.alert('Unable to detect your address.');
        }
    });
}*/
