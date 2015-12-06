Meteor.publish("MS.Comments.Comments.PublishComments", function(){
   return MS.Comments.Collections.Comments.find();
});
