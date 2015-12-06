Template.profile.helpers({
    'HeadFilepickerId': function () {
      if(this.filepickerId){
          return this.filepickerId;
      }else{
        return 'skywtYkRhuNbJLJe3cAz';
      }

    }
  });

Template.profile.events({
  'click .uploadImg': function(){
    var Posts = MS.Posts.Collections.Posts;
      filepicker.pickAndStore(
        {
          mimetypes: ['image/gif','image/jpeg','image/png'],
          multiple: false
        },{
          access:"public"
        },
        function(InkBlobs){
          var InkBlob = _.first(InkBlobs);
          var filepickerId = _.last(InkBlob.url.split("/"));
          console.log(JSON.stringify(InkBlob));
          //var image = Images.findOne({userId:Meteor.userId()});
          //if(image){
            //console.log(this._id);
            
            Meteor.call('insertHeadImg', filepickerId, function (e, r) {
              console.log(e); console.log(r);
            });

            Posts.update({_id:Meteor.user().postId},
            {
              $set:{
                filepickerId: filepickerId,
                inkBlob:InkBlob
              }  
            }, function(e,r){ console.log(e);console.log(r); });


          /*}else{
            Images.insert({
              userId:Meteor.userId(),
              filepickerId:_.last(InkBlob.url.split("/")),
              inkBlob:InkBlob,
              createdAt:new Date() //this isnt guarnteed accurate, but its ok for this simple demo
            });
          }*/
        },
        function(FPError){
           if(FPError && FPError.code !== 101)
            alert(FPError.toString());
        }
      );
    }
});
