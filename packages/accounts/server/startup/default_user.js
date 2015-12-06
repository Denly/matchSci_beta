Meteor.startup(function () {
  //Demo Purposes.

  if (_.isEqual(Meteor.users.find().count(), 0)) {
    var defaultUsers = [{
      username: 'Justin_Bieber',
      email: 'justin@gmail.com',
      password: '123456',
      position: 'default',
      profile: {
        //publicly visible fields like firstname goes here
        position: 'default',
        filepickerId: "nujFtMCaQWyRsRHEpOZQ"
      }
    }, {
      username: 'Jack_Sparrow',
      email: 'jack@gmail.com',
      password: '123456',
      position: 'default',
      profile: {
        //publicly visible fields like firstname goes here
        position: 'default',
        filepickerId: "lgLk7iuTM47GYMz6SlxQ"
      }
    }, {
      username: 'Lee_Ing_Love',
      email: 'lee@gmail.com',
      password: '123456',
      position: 'default',
      profile: {
        //publicly visible fields like firstname goes here
        position: 'default',
        filepickerId: "vqMjBNw0SLuSxObAaAdX"
      }
    }, {
      username: 'Denly',
      email: '007623@gmail.com',
      password: '123456',
      position: 'default',
      profile: {
        //publicly visible fields like firstname goes here
        position: 'default',
        filepickerId: "skywtYkRhuNbJLJe3cAz"
      }
    }]

    _.each(defaultUsers, function (accounts) {
        MS.Accounts.Functions.buildNewUser(accounts);
    });
  }

});