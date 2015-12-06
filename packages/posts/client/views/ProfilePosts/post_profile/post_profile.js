Template.profile.events({
  "click #event": function(event, template) {

  }
});

Template.profile.helpers({
  user: function() {
    return !!Meteor.user();
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  loading: function() {
    return Session.get('loadingLocation');
  },
  location: function() {
    locationXY = Session.get('locationXY');
    if (locationXY) {
      delete locationXY.get;
      var Posts = MS.Posts.Collections.Posts;
      Posts.update({
        _id: this._id
      }, {
        $set: {
          location: {
            type: "Point",
            coordinates: [locationXY.y, locationXY.x]
          }
        }
      }, function(e, r) {
        if (e) {
          console.log('error');
          console.log(e);
        }
        if (r) { //console.log('updeted obj number');console.log(r)
          ;
        }
      });
      Session.set('locationXY', '');
    }

    if (this.location) {
      return "x: " + this.location.coordinates[0] + " y: " + this.location.coordinates[1];
    } else {
      return "you haven't set your location";
    }
  },
  distance: function() {
    var Posts = MS.Posts.Collections.Posts;
    if (this.location && Posts.findOne(Meteor.user().postId).location) {
      var myloc = Posts.findOne(Meteor.user().postId).location.coordinates;
      var distance = getDistance(myloc[0], myloc[1], this.location.coordinates[0], this.location.coordinates[1], 'K');
      //console.log('distance ' + distance);
      return distance;
    } else if (this.location) {
      return "you haven't set your location"
    } else {
      return "This user hasn't set the location"
    }
  },
  address: function() {
    //ReverseGeocode(this.location.x, this.location.y);
  }
});

function getCoordinate(geocoder){
  var lat = '';
    var lng = '';
    var address = 'USA, Diamond Bar, CA 91765';//{zipcode} or {city and state};
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         lat = results[0].geometry.location.lat();
         lng = results[0].geometry.location.lng();
         console.log('Latitude: ' + lat + ' Logitude: ' + lng);
       } else {
        alerconsole.logt("Geocode was not successful for the following reason: " + status);
      }
        });
      
    
}

Template.profile.onRendered(function() {
  var _this = this;
  
  _this.autorun(function() {
    if (navigator.geolocation) { //First Check if the broswer support navigation

      navigator.geolocation.getCurrentPosition(function(position) { //we do the call to get the current user lat and long
				//this is the geocoder from google
			var geocoder = new google.maps.Geocoder(),
			 //with this transform the current result aka {position} into a readable lat and long for google
			latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      getCoordinate(geocoder);
			//call geocoder to play with our lat and long
      geocoder.geocode({
        'location': latLng
      }, function(results, status) {
				//if result is OK
        if (status == google.maps.GeocoderStatus.OK) {
					//ge the result form the status [array]
          if (results[1]) {
						//print the formatted address
            console.log(results[1].formatted_address);
          }
        };
      });
      }, function() {
        handleNoGeolocation(true);
      });
    }else{
			console.log("broswer dont support navigation");
		}
  });

  Meteor.setTimeout(function(){
    $( '.swipebox' ).swipebox();
  },0);
});

Template.profile.onCreated(function() {
  Session.set('loadingLocation', false);
  Session.set('locationXY', '');
  loadFilePicker('AgbGlQUT7CqMh4xLTCZQZz');
});

function getDistance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var radlon1 = Math.PI * lon1 / 180;
  var radlon2 = Math.PI * lon2 / 180;
  var theta = lon1 - lon2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);;
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344
  };
  if (unit == "N") {
    dist = dist * 0.8684
  };
  return dist;
}
