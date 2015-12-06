Meteor.settings = {
  "public" : {
    "filepicker":{
      "key":"AgbGlQUT7CqMh4xLTCZQZz",
      "cdn_domain":"<YOUR CDN DOMAIN, looks like xxxxxxxxxxx.cloudfront.net>"
    }
  }
};

//Facebook Config
ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '578496305622125',
    secret: '21daa1bd41b32788313ecf83b544889d'
});
