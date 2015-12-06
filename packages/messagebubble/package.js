Package.describe({
  name: 'matchsci:messagebubble',
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
    'client/views/messagebubble.html',
    'client/views/messagebubble.css',
    'client/views/messagebubble.js',
    'client/views/messagebubble_pagination.js',
    'client/views/bubbleItem.html',
    'client/views/bubbleItem.js'
    ],'client');
});