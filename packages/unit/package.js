Package.describe({
  name: 'matchsci:unit',
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
    'client/big_img_view.html',
    'client/big_img_view.css',
    'client/big_img_view.js'
  ], 'client');
  api.addFiles([
    'both/namespace.js'
  ]);
  
});

