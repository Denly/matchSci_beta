/*
1. For New User , create new post by onLogin
2. Showing user is onlin by UserStatus from package
3. insertHeadImg update users
4. buildNewUser tool for server side

Accounts.createUser() only accept 
username String
A unique name for this user.

email String
The user's email address. and it'll be transfer to emails: [ { address: '20gmail.com', verified: false } ] 

password String
The user's password. This is not sent in plain text over the wire.

profile Object
The user's profile, typically including the name field.
*/

/** tool for building New User and post **/
MS.Accounts.Functions.buildNewUser = function(user, post) {
  console.log("buildNewUser"); //console.dir(user);
  //Create user()
  var userId = Accounts.createUser({
    username: user.username,
    email: user.email,
    password: user.password,
    profile: user.profile
  });
  console.log('post from client');
  console.dir(post);
  MS.Posts.Collections.Posts.update({userId: userId}, {$set: post}, function(r){
    console.log('update in buildNewUser'+r);
  });
    return userId;
};

Meteor.methods({
  buildNewUser: function(arr) {
    check(arr, Array);
    var user = arr[0];
    var post = arr[1];
    return MS.Accounts.Functions.buildNewUser(user, post);
  }
});



/** examinate new user and create user.profile **/
Accounts.onCreateUser(function(options, user) {
  _.extend(user, options
    );
  
  if(!user.profile)
    user.profile = {filepickerId : 'skywtYkRhuNbJLJe3cAz'};

    
  if (user.services.facebook) {
    var Facebookdata = getFaceBookUserData(user);
    user = buildUserByFB(user, options, Facebookdata);
    var post = buildPostByFB(user, Facebookdata);
  } else {
    //non-FB create
  }
  
  if(validateNewUser(user)){
    user.postId = MS.Posts.Functions.createPost(user, post);
  }
  return user;
});
function buildPostByFB(user, resultFacebook){
  var post = MS.Posts.Functions.getBlankPost();
  var myInfo = [
  {item:'Gender', value: user.services.facebook.gender},
  {item:'Age', value: user.services.facebook.age_range.min},
  {item:'birthday', value: user.services.facebook.birthday},
  {item:'locale', value: user.services.facebook.locale}
  ];
  
  post = MS.Posts.Functions.updateMyInfoObject(post, myInfo);
  //MS.Posts.Functions.createPost(user, post);
  return post;
}


function buildUserByFB(user, options, resultFacebook){
  console.log('resultFacebook');console.log(resultFacebook);
  facebookPicture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    user.services.facebook.picture = facebookPicture;
    console.log(resultFacebook.data);
    var birthday = _.pick(resultFacebook.data, "birthday"),
      description = _.pick(resultFacebook.data, "bio"),
      userEmail = _.pick(resultFacebook.data, "email");
      console.log(birthday);
      console.log(description);
      console.log(userEmail);
    options.profile.dob = birthday.birthday;
    options.profile.description = description.bio;
    options.profile.position = 'generalUser';
    options.roles = ['member'];
    user.services.facebook.birthday = birthday.birthday;
    
    user.profile = options.profile;
    user.email = userEmail;
    user.username = _.first(user.services.facebook.name.split(' ')) + "_"+userEmail.email.split('@')[0];
    return user;
}
function getFaceBookUserData(user){
  var accessTokenFacebook = user.services.facebook.accessToken,
      userFacebookId = user.services.facebook.id,
      resultFacebook = Meteor.http.get("https://graph.facebook.com/me?", {
        headers: {
          "User-Agent": "Meteor/1.0"
        },

        params: {
          access_token: accessTokenFacebook,
          fields: ['email', 'name', 'bio', 'birthday']
        }
      });
    return resultFacebook;
}


function validateNewUser(user){
  /*
  console.log('validateNewUser');
  console.log(user);
  var valid = true;
  if(user == {} || !user){
    throw new Meteor.Error("user can't be empty");
    valid = false;
  }
  if(!user.email && !user.emails){
   throw new Meteor.Error("user's email can't be empty");
    valid = false;
  }
  if(Meteor.users.findOne(user._id)){
   throw new Meteor.Error("userId "+user._id+" already exist");
    valid = false;
  }
  if(user.email && Meteor.users.findOne({email: user.email}))
    if(user.emails && Meteor.users.findOne({email: user.emails})){
   throw new Meteor.Error("email "+user.email+" already exist");
    valid = false;
  }
    return valid;*/
    return true;
};

Accounts.validateNewUser(function(user){
  return validateNewUser(user);
});

/* Show User online or not */
UserStatus.events.on("connectionLogin", function(fields) {
  MS.Posts.Collections.Posts.update({
    userId: fields.userId
  }, {
    $set: {
      Online: true
    }
  }, function(e, r) {
    //console.log(e); console.log(r);
  });
})


UserStatus.events.on("connectionLogout", function(fields) {
  MS.Posts.Collections.Posts.update({
    userId: fields.userId
  }, {
    $set: {
      Online: false
    }
  }, function(e, r) {
    //console.log(e); console.log(r);
  });
})

/* update headimg in .user() */
Meteor.methods({
  insertHeadImg: function(filepickerId) {
    check(filepickerId, String);
    console.log('filepickerId is ' + filepickerId);
    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: {
          filepickerId: filepickerId
        }
      }
    }, function(e, r) {
      console.log(e);
      console.log(r);
    });
  }

});



/*

//For poeple has not post, will create a post for them
Meteor.methods({
  newUser: function(userId) {
    check(userId, String);
    if (!Meteor.user().postId) {
      console.log('*******NEW user*******');

      var post = {
        summary: "Hi, I'm new here and I'll complete my profile soon.",
        weekend: "",
        interesting: "",
        filepickerId: "skywtYkRhuNbJLJe3cAz", //cat img is default
        userId: userId,
        author: Meteor.user().username,
        submitted: new Date(),
        lookingFor: MS.Posts.Objects.defaultLookingfor,
        myInfo: MS.Posts.Objects.defaultMyInfo,
        searchConfig: MS.Posts.Objects.defaultSearchConfig
      };
      var postId = MS.Posts.Collections.Posts.insert(post);
      return postId;

    } else {
      return false;
    }
  }

});
*/