Template.uploadNews.onCreated(function () {
  Session.set('postEditErrors', {});
  Session.set('newsImg', {});
  Session.set('isIssueOption', '');
  this.isSearch = new ReactiveVar(false);
});

Template.uploadNews.helpers({ 
  errorMessage: function(field) {    
  return Session.get('postEditErrors')[field]; },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  },
  isUser: function () {
    return !!Meteor.user();
  },
  NewsFilepickerId: function(){
    return Session.get('newsImg').filepickerId;
  },
  opt: function(){
    return Session.get('isIssueOption');
  },
  placeholder: function(){
    return Session.get('isIssueOption') ? "Make a question?" : "Something want to show?";
  },
  search: function(){
    return Template.instance().isSearch.get();
  }
});

Template.uploadNews.events({
  'click .uploadImg': function(){
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

        Session.set('newsImg', {
          filepickerId: filepickerId,
          inkBlob:InkBlob
        });        
/*
            
            */
        },
        function(FPError){
           if(FPError && FPError.code !== 101)
            alert(FPError.toString());
        }
      );
    },
    'click .submit': function(e){ 
    var obj = Session.get('newsImg');
    _.extend(obj, {
              postId: Meteor.user().postId,
              userId: Meteor.userId(),
              text: $('textarea').val(),
              submitted: new Date()
      });
       if(!obj.text && !obj.filepickerId){ 
        //console.log($(e.target).find('textarea').val());  
        return Session.set('postEditErrors', {text: "Pleace write something"});
      }

//Insert Issue
      var isIssue = Session.get('isIssueOption');
      //console.log('isIssue');console.log(isIssue);
      if(isIssue[0] && isIssue[1]){
      var option = [];
      var selection = 0;
      var isChecked = false;
      for (var i = isIssue.length - 1; i >= 0; i--){
        var text = $($('.optInput')[i]).val();
        if(text){
          option.push(text);
        }else{
          return Session.set('postEditErrors', {text: "Pleace write sothing in a option"});
        }
       
      };
      //console.log(option);
      
      obj.option = option;
      obj.type = 'issue';
      MS.Timeline.Collections.Timeline.insert(obj,function(e,r){ console.log(e);console.log(r); });
      console.log('isert Issue');
    }else if(isIssue[1]){
      Session.set('postEditErrors', {text: "At least two options"});
    }else{
//Insert News
      console.log('insert news');
      obj.type = 'news';
      MS.Timeline.Collections.Timeline.insert(obj,function(e,r){ console.log(e);console.log(r); });
    }

    },
    'click .issue': function(){ 
      var isIssueOption = Session.get('isIssueOption') ? Session.get('isIssueOption') : [];
      if(isIssueOption[0] === undefined){
        nextIndex = 0;
        isIssueOption.push({index: nextIndex, creatingIssue: true});
      }
      nextIndex = isIssueOption.length;
      isIssueOption.push({index: nextIndex, creatingIssue: true});
      Session.set('isIssueOption', isIssueOption);
      //$('.form-group').append('<div class="input-group issueOpt"><span class="input-group-addon"><input type="checkbox" aria-label="..."></span><input type="text" class="form-control" aria-label="..." placeholder="Option 1"><span class="input-group-addon"><button type="button" class="close deleOpt" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></span></div><!-- /input-group -->');
      
    },
    'keyup textarea': function(e,ins){ 
      //console.log(ins.$('textarea').val());
      var text = ins.$('textarea').val();
      Session.set('searchingIssue', "GoBro");
    },
    'click .newPost': function(){
      Session.set('isIssueOption', '');
    },
    'click .search': function(){
      Template.instance().isSearch.set(true);
    }
});
