Package.describe({
  name: 'matchsci:subscriptions',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.use('matchsci:base');

  api.addFiles([
    'both/namespace.js',

    //Collections
    'both/collections/subscriptions.js'
    ]);

    api.addFiles([

      //HTML
      'client/views/subscription-modal/subscription-modal.html',

      //JS
      'client/views/subscription-modal/subscription-modal.js',

      //Utils
      'client/utils/subscriptions/subscriptions.js'
    ],'client');

    api.addFiles([

      //Methods
      'server/methods.js',

      //Allows
      'server/allows/subscriptions.js',

      //Subscriptions
      'server/subscriptions/subscriptions.js'

    ],'server');
});
