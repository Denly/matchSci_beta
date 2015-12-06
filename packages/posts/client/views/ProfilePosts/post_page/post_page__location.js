Template.profile.events({
	'click .getLocation': function(){
		var currentPost = this;
		//console.log('getLocation');

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition, showError);
				Session.set('loadingLocation', true);
				var locationXY = Session.get('locationXY');
				//console.log(locationXY);
				//console.log(currentPost._id)
			} else { 
				Session.set('loadingLocation', false);
				Errors.throw("Geolocation is not supported by this browser.");
			}
		}
		getLocation();


		function showPosition(position) {
			Session.set('loadingLocation', false);
			var loc = {x: position.coords.latitude, y: position.coords.longitude};
			//console.log('loc');
			//console.log(loc);
			Session.set('locationXY', loc);
			
			
		}

		function showError(error) {
			Session.set('loadingLocation', false);
			switch(error.code) {
				case error.PERMISSION_DENIED:
				Errors.throw("User denied the request for Geolocation.");
				break;
				case error.POSITION_UNAVAILABLE:
				Errors.throw("Location information is unavailable.");
				break;
				case error.TIMEOUT:
				Errors.throw(x.innerHTML = "The request to get user location timed out.");
				break;
				case error.UNKNOWN_ERROR:
				Errors.throw("An unknown error occurred.");
				break;
			}
		}

		function saveLocation(){

		}
	}
});