Template.step2.events({
  "click #login_with_facebook": function() {
    console.log("click");
    Meteor.loginWithFacebook({
      requestPermissions: ['email', 'user_birthday', 'user_about_me', 'user_posts']
    }, function(err) {
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      } else {
        console.log(result);
        console.log(Meteor.user());
      }
    });
  },
  'click #submitReg': function() {
    console.log("clikck");
    console.log(Template.instance().$("[name='username']").val());
    var username = Template.instance().$("[name='username']").val();
    var password = Template.instance().$("[name='password']").val();
    var user = {
      username: username,
      password: password,
      email: Template.instance().$("[name='email']").val()
    }
    var myInfo = MS.Posts.Objects.defaultMyInfo;
    myInfo[0].value = Session.get('regData');
    var post = {
      author: Template.instance().$("[name='username']").val(),
      location: {
        coordinates: Template.instance().address.get().coordinates,
        type:'Point'
      },
      address: {
        country: Template.instance().$("[name='country']").val(),
        zipcode: Template.instance().$("[name='zipcode']").val()
      },
      birthday: new Date( Template.instance().$("[name='birthday']").val() ),
      myInfo: myInfo
    }
    console.log('post is ');
    console.log(myInfo);
    console.log(user);
    console.log(post);
    //MS.Accounts.Functions.buildNewUser(user, post);
    Meteor.call('buildNewUser', [user, post], function(error, result) {
      console.log(result);
      if(result){
        Session.set("questionStep", true);
        Session.set('regStep', 'step3');
        Meteor.loginWithPassword(username, password);
        Session.set("questionStep", true);
        Session.set('regStep', 'step3');
      }else{
        throw new Meteor.Error("Register login failed");
      }
    });
  }
})

Template.step2.helpers({
  country: function () {
    return Template.instance().address.get().country;
  },
  zipcode: function () {
    return Template.instance().address.get().zipcode;
  },
  GPSstatus: function () {
    if(!Template.instance().address.get())
      return 'getting GPS..';
    else
      return 'Ah, ' + Template.instance().address.get().country+' '+Template.instance().address.get().zipcode;
  }

  
});

Template.step2.onRendered(function() {
  var _this = this;
  
  _this.autorun(function() {
    if (navigator.geolocation) { //First Check if the broswer support navigation

      navigator.geolocation.getCurrentPosition(function(position) { //we do the call to get the current user lat and long
      var geocoder = new google.maps.Geocoder(),
      latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      geocoder.geocode({
        'location': latLng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
          
          if (results[0]) {
            //print the formatted address
            _this.address.set(pareComponment(results[0]));
            console.log(results[0].formatted_address);
            console.log(_this.address.get());
            //_this.address = results[0].formatted_address;
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

});

Template.step2.onCreated(function(){
  this.address = new ReactiveVar("");
});

function pareComponment(item){
var arrAddress = item.address_components;
var itemRoute='';
var itemLocality='';
var itemCountry='';
var itemPc='';
var itemSnumber='';

// iterate through address_component array
$.each(arrAddress, function (i, address_component) {
    console.log('address_component:'+i);

    if (address_component.types[0] == "route"){
        console.log(i+": street(route):"+address_component.long_name);
        itemRoute = address_component.long_name;
    }

    if (address_component.types[0] == "locality"){
        console.log("city(locality):"+address_component.long_name);
        itemLocality = address_component.long_name;
    }

    if (address_component.types[0] == "country"){ 
        console.log("country:"+address_component.long_name); 
        itemCountry = address_component.long_name;
    }

    if (address_component.types[0] == "postal_code"){ 
        console.log("postcode:"+address_component.long_name);  
        itemPc = address_component.long_name;
    }

    if (address_component.types[0] == "street_number"){ 
        console.log("street_number:"+address_component.long_name);  
        itemSnumber = address_component.long_name;
    }
    //return false; // break the loop   
});
  return {
    country: itemCountry,
    zipcode: itemPc,
    city: itemLocality,
    street: itemRoute,
    streetNum: itemSnumber,
    coordinates: [item.geometry.location.lat(), item.geometry.location.lng()]   
  };
}