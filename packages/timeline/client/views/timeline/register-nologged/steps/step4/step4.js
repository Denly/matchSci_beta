/**
This page should get User's .Posts to update own profile
Do the samething as 
/posts/post_page/post_page__filepicker.js (update img)
/posts/post_edit/ (update self-intro)
Go bro!
*/

Template.step4.helpers({
    'HeadFilepickerId': function () {
      if(this.filepickerId){
          return this.filepickerId;
      }else{
        return 'skywtYkRhuNbJLJe3cAz';
      }

    }
  });
