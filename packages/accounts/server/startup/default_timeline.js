Meteor.startup(function () {
  
  Posts = MS.Posts.Collections.Posts;
  Timeline = MS.Timeline.Collections.Timeline;
if (!Timeline.findOne({
    _id: "pLZtRBdzkhQMQ54GH"
  })) {
  var obj = {
    _id: "pLZtRBdzkhQMQ54GH",
    type: 'issue',
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

  Timeline.insert(obj);
}

if (!Timeline.findOne({
    _id: "QStzaDfoHvRPbtNSK"
  })) {
  var obj = {
    _id: "QStzaDfoHvRPbtNSK",
    type: 'issue',
    option: ["My Mom", "My Lover", "No one. It's too dangerous."],
    postId: Posts.findOne({
      author: "Jack_Sparrow"
    })._id,
    selection: 0,
    submitted: new Date(),
    text: "Your lover and your mom is falling in a dangerous sea. Who will you rescue first?",
    userId: Posts.findOne({
      author: "Jack_Sparrow"
    }).userId
  };

  Timeline.insert(obj);
}

if (!Timeline.findOne({
    _id: "9TWh82L8hLymkGepi"
  })) {
  var obj = {
    _id: "9TWh82L8hLymkGepi",
    type: 'issue',
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

  Timeline.insert(obj);
}
});
