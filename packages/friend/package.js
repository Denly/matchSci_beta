Package.describe({
  name: 'matchsci:friend',
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
    'both/friendsReaction.js'
  ]);

  api.addFiles([
  'client/views/friend/friend_dropdown/friend_dropdown.html',
  'client/views/friend/friend_dropdown/friend_dropdown.js',
  'client/views/friend/friend_bar/friend_bar.html',
  'client/views/friend/friend_bothlike/friend_bothlike.html',
  'client/views/friend/friend_bothlike/friend_bothlike.js',
  'client/views/friend/friend_likeyou/friend_likeyou.html',
  'client/views/friend/friend_likeyou/friend_likeyou.js',
  'client/views/friend/friend_visitor/friend_visitor.html',
  'client/views/friend/friend_visitor/friend_visitor.js',
  'client/views/friend/friend_youlike/friend_youlike.html',
  ],'client');
});
