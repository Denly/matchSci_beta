/*Meteor.startup(function () {
  //
})
//[latitude 緯度 longitude 經度, ]
var defaultLookingfor = [
        {item:'Looking for', value: 'male', selections: ['male', 'female', 'other']},
        {item:'Age', value: ''},
        {item:'For', value: 'long-term dating', selections: ['new friends', 'long-term dating', 'short-term dating']},
        {item:'Ethnic', value: '--', selections: ['']}
        ];

var defaultMyInfo = [
        {item:"I'm", value: 'female', selections: ['male', 'female', 'other']},
        {item:'Orientation', value: '--', selections: ['Straight', '--']},
        {item:'For', value: 'long-term dating', selections: ['new friends', 'long-term dating', 'short-term dating']},
        {item:'Height', value: ''},
        {item:'Age', value: ''},
        {item:'Body Type', value: '--', selections: ['skinny', 'normal', '肉肉']},
        {item:'Education', value: 'college', selections: ['college', 'high school']},
        {item:'Relgion', value: '--', selections: []},
        {item:'Speak', value: '--', selections: []},
        {item:'Ethnic', value: '--', selections: ['']},
        {item:'Salary', value: ''}
        ];


if (!Meteor.users.findOne({
    username: 'Denly'
  })) {
  console.log('creating Denly');
  /*var ids = Accounts.createUser({
    username: 'Denly',
    email: '007623@gmail.com',
    password: '123456',
    position: 'default',
    profile: {
      //publicly visible fields like firstname goes here
      position: 'default',
      filepickerId: "vqMjBNw0SLuSxObAaAdX"
    }

  });

  var postId = Posts.insert({
    		userId: ids,
    		author: 'Denly',
    		summary: "Hi, I'm Denly.",
    		interesting: "coding",
    		weekend: "coding",
    		submitted: new Date(),
    		filepickerId: "5g1xWq1kRTCCsY4NNEvW",
    		position: 'default',
    		location: {
      		type: "Point",
      		coordinates: [-71.0571571, 42.3133735]
    		},
        lookingFor: defaultLookingfor,
        myInfo: defaultMyInfo
  	});

  var n = Meteor.users.update({
    _id: ids
  }, {
    $set: {
      postId: postId
    }
  });

  console.log('jack _id ' + ids + ' postId is ' + postId + ' updat ' + n);
}

if (!Meteor.users.findOne({
    username: 'Justin_Bieber'
  })) {
  console.log('creating Justin_Bieber');
  /*var ids = Accounts.createUser({
    username: 'Justin_Bieber',
    email: 'justin@gmail.com',
    password: '123456',
    position: 'default',
    profile: {
      //publicly visible fields like firstname goes here
      position: 'default',
      filepickerId: "nujFtMCaQWyRsRHEpOZQ"
    }

  });

  var postId = Posts.insert({
    userId: ids,
    author: 'Justin_Bieber',
    summary: "Yo love me baby. I'm not a jerk, really.",
    weekend: "Using drug or drinking alcohol I guess. Yo!",
    interesting: "Being the most famour jerk on the earth (and the most handsome of course).",
    submitted: new Date(),
    filepickerId: "nujFtMCaQWyRsRHEpOZQ",
    position: 'default',
    location: {
      type: "Point",
      coordinates: [86.2849101, 14.2066981]
    },
    lookingFor: defaultLookingfor,
    myInfo: defaultMyInfo

  });

  var n = Meteor.users.update({
    _id: ids
  }, {
    $set: {
      postId: postId
    }
  });

  console.log('jack _id ' + ids + ' postId is ' + postId + ' updat ' + n);
}

if (!Meteor.users.findOne({
    username: 'Jack_Sparrow'
  })) {
  console.log('creating Jack_Sparrow');
  /*var ids = Accounts.createUser({
    username: 'Jack_Sparrow',
    email: 'jack@gmail.com',
    password: '123456',
    position: 'default',
    profile: {
      //publicly visible fields like firstname goes here
      position: 'default',
      filepickerId: "lgLk7iuTM47GYMz6SlxQ"
    }

  });

  var postId = Posts.insert({
    userId: ids,
    author: 'Jack_Sparrow',
    summary: "Hi, I'm Jack Sparrow. The amzing undead man.",
    submitted: new Date(),
    filepickerId: "lgLk7iuTM47GYMz6SlxQ",
    position: 'default',
    location: {
      type: "Point",
      coordinates: [-74.9676365, 14.2674339]
    },
    lookingFor: defaultLookingfor,
    myInfo: defaultMyInfo

  });

  var n = Meteor.users.update({
    _id: ids
  }, {
    $set: {
      postId: postId
    }
  });

  console.log('jack _id ' + ids + ' postId is ' + postId + ' updat ' + n);
}

if (!Meteor.users.findOne({
    username: 'Lee_Ing_Love'
  })) {
  console.log('creating Lee_Ing_Love');
  var ids
  /*ids = Accounts.createUser({
    username: 'Lee_Ing_Love',
    email: 'lee@gmail.com',
    password: '123456',
    position: 'default',
    profile: {
      //publicly visible fields like firstname goes here
      position: 'default',
      filepickerId: "vqMjBNw0SLuSxObAaAdX"
    }

  });

  var postId = Posts.insert({
    userId: ids,
    author: 'Lee_Ing_Love',
    summary: "Hi, I'm Lee Ing Love. The cutest Korean. Men, call me the queen.",
    interesting: "watching Korean drama",
    weekend: "watching Korean drama",
    submitted: new Date(),
    filepickerId: "vqMjBNw0SLuSxObAaAdX",
    position: 'default',
    location: {
      type: "Point",
      coordinates: [
        127.096405, 35.8615124
      ]
    },
    lookingFor: defaultLookingfor,
    myInfo: defaultMyInfo
  });

  var n = Meteor.users.update({
    _id: ids
  }, {
    $set: {
      postId: postId
    }
  });

  console.log('jack _id ' + ids + ' postId is ' + postId + ' updat ' + n);
}




if (MessageList.find().count() === 0) {
  MessageList.insert({
    from: 'QRKPX2DCmJbnS2R5q',
    to: 'Marry',
    submitted: '04_12_2015',
    text: "hi what's up"
  });
  MessageList.insert({
    from: 'Denly',
    to: 'Marry',
    submitted: '04_13_2015',
    text: "Yoyo"
  });
}

if (Message.find().count() === 0) {
  Message.insert({
    from: 'QRKPX2DCmJbnS2R5q',
    to: 'Marry',
    submitted: '04_12_2015',
    text: "hi what's up"
  });
  Message.insert({
    from: 'Denly',
    to: 'Marry',
    submitted: '04_13_2015',
    text: "Yoyo"
  });
}
*/
/*
Posts = MS.Posts.Collections.Posts;
if (!Issue.findOne({
    _id: "pLZtRBdzkhQMQ54GH"
  })) {
  var obj = {
    _id: "pLZtRBdzkhQMQ54GH",
    option: ["Sure, I believe!", "No, he sucks."],
    postId: Posts.findOne({
      author: "Justin_Bieber"
    })._id,
    selection: 0,
    submitted: new Date(),
    text: "Do you think Justin Bieber is a great singer?",
    userId: Posts.findOne({
      author: "Justin_Bieber"
    }).userId
  };

  Issue.insert(obj);
}

if (!Issue.findOne({
    _id: "QStzaDfoHvRPbtNSK"
  })) {
  var obj = {
    _id: "QStzaDfoHvRPbtNSK",
    option: ["My Mom", "My Lover", "No one. It's too dangerous."],
    postId: Posts.findOne({
      author: "Jack_Sparrow"
    })._id,
    selection: 0,
    submitted: new Date(),
    text: "Your lover and your mom is drowning in a dangerous sea. Who will you rescue first?",
    userId: Posts.findOne({
      author: "Jack_Sparrow"
    }).userId
  };

  Issue.insert(obj);
}

if (!Issue.findOne({
    _id: "9TWh82L8hLymkGepi"
  })) {
  var obj = {
    _id: "9TWh82L8hLymkGepi",
    filepickerId: "3x1ph1VlTSypDg6b1hqb",
    option: ["Fighting!", "Run with your lover, holding her/his hand.", "Leave your lover to the monster, so I can run safely.", "Just run away! I won't think too much."],
    postId: Posts.findOne({
      author: "Lee_Ing_Love"
    })._id,
    selection: 0,
    submitted: new Date(),
    text: "You are walking in a forest with your lover. Unfortunately, there is a furious gigantic monster, rushing toward you and your lover. What will you do?",
    userId: Posts.findOne({
      author: "Lee_Ing_Love"
    }).userId
  };

  Issue.insert(obj);
}*/
