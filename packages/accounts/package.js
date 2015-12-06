Package.describe({
  name: 'matchsci:accounts',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'This is the matchsci accountd package',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  api.use('matchsci:base');
  api.addFiles([
    'both/namespace.js',
  ]);

  api.addFiles([
    'server/startup/default_user.js',
    'server/startup/random_users.js',
    'server/startup/default_message.js',
    'server/startup/default_timeline.js',
    'server/new_users_server.js',

    //config
    'server/config/users.js'
  ], 'server');

  api.addFiles([
    'client/new_users.js',

    'client/collections/register.js'
  ], 'client');
});
